/**
 * main.js
 * the main file for the Aleppo analysis application
 * it contains comprehensive import functions for all supported formats
 */

// Global variables to track imported layers
window.importedLayers = window.importedLayers || {};
window.importedLayerCounter = 0;

/**
 * Utility function to convert file to ArrayBuffer
 * @param {File} file - the file to convert
 * @returns {Promise<ArrayBuffer>} - the file as ArrayBuffer
 */
async function fileToArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Utility function to show user notifications
 * @param {string} message - the message to show
 * @param {string} type - the type of notification (success, error, warning)
 */
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196F3'};
    color: white;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 10000;
    font-family: Arial, sans-serif;
    max-width: 300px;
    word-wrap: break-word;
  `;
  notification.innerHTML = `
    <div style="display: flex; align-items: center;">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : type === 'warning' ? 'exclamation-circle' : 'info-circle'}" style="margin-right: 10px;"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);
}

/**
 * Validate GeoJSON coordinates
 * @param {Array} coordinates - the coordinates to validate
 * @returns {Array} - cleaned coordinates
 */
function validateCoordinates(coordinates) {
  if (!Array.isArray(coordinates)) return [];
  
  return coordinates.map(coord => {
    if (Array.isArray(coord)) {
      if (Array.isArray(coord[0])) {
        return validateCoordinates(coord);
      } else {
        // Point coordinates
        const [lng, lat] = coord;
        if (typeof lng === 'number' && typeof lat === 'number' && 
            !isNaN(lng) && !isNaN(lat) && 
            lng >= -180 && lng <= 180 && 
            lat >= -90 && lat <= 90) {
          return [lng, lat];
        }
        return null;
      }
    }
    return null;
  }).filter(coord => coord !== null);
}

/**
 * Process KML file and convert to GeoJSON
 * @param {string} kmlContent - the KML file content
 * @returns {Object} - GeoJSON object
 */
function processKMLFile(kmlContent) {
  if (!kmlContent || typeof kmlContent !== 'string') {
    throw new Error('محتوى ملف KML فارغ أو غير صالح');
  }

  if (!kmlContent.includes('<kml') && !kmlContent.includes('<?xml')) {
    throw new Error('ملف KML غير صالح - لا يحتوي على علامات XML المطلوبة');
  }

  try {
    const parser = new DOMParser();
    const kmlDoc = parser.parseFromString(kmlContent, 'text/xml');

    // Check for parser errors
    const parseErrors = kmlDoc.getElementsByTagName('parsererror');
    if (parseErrors.length > 0) {
      throw new Error('خطأ في تحليل XML: ' + parseErrors[0].textContent);
    }

    // Extract features from KML
    const features = [];
    const placemarks = kmlDoc.getElementsByTagName('Placemark');

    for (let i = 0; i < placemarks.length; i++) {
      const placemark = placemarks[i];
      const feature = convertPlacemarkToFeature(placemark, i);
      if (feature) {
        features.push(feature);
      }
    }

    if (features.length === 0) {
      throw new Error('لم يتم العثور على أي عناصر جغرافية صالحة في ملف KML');
    }

    return {
      type: 'FeatureCollection',
      features: features
    };
  } catch (error) {
    throw new Error(`فشل في معالجة ملف KML: ${error.message}`);
  }
}

/**
 * Convert KML Placemark to GeoJSON Feature
 * @param {Element} placemark - the placemark element
 * @param {number} index - the index for naming
 * @returns {Object} - GeoJSON Feature
 */
function convertPlacemarkToFeature(placemark, index) {
  try {
    const feature = {
      type: 'Feature',
      properties: {},
      geometry: null
    };

    // Extract name
    const nameElement = placemark.getElementsByTagName('name')[0];
    if (nameElement) {
      feature.properties.name = nameElement.textContent.trim();
    } else {
      feature.properties.name = `Placemark ${index + 1}`;
    }

    // Extract description
    const descElement = placemark.getElementsByTagName('description')[0];
    if (descElement) {
      feature.properties.description = descElement.textContent.trim();
    }

    // Extract geometry
    const point = placemark.getElementsByTagName('Point')[0];
    const lineString = placemark.getElementsByTagName('LineString')[0];
    const polygon = placemark.getElementsByTagName('Polygon')[0];

    if (point) {
      feature.geometry = convertKMLPoint(point);
    } else if (lineString) {
      feature.geometry = convertKMLLineString(lineString);
    } else if (polygon) {
      feature.geometry = convertKMLPolygon(polygon);
    } else {
      return null;
    }

    return feature;
  } catch (error) {
    console.error(`Error converting placemark ${index + 1}:`, error);
    return null;
  }
}

/**
 * Convert KML Point to GeoJSON geometry
 */
function convertKMLPoint(pointElement) {
  const coordsElement = pointElement.getElementsByTagName('coordinates')[0];
  if (!coordsElement) {
    throw new Error('Point missing coordinates');
  }

  const coordsText = coordsElement.textContent.trim();
  const coords = coordsText.split(',').map(c => parseFloat(c.trim()));
  
  if (coords.length < 2 || isNaN(coords[0]) || isNaN(coords[1])) {
    throw new Error('Invalid point coordinates');
  }

  return {
    type: 'Point',
    coordinates: [coords[0], coords[1]]
  };
}

/**
 * Convert KML LineString to GeoJSON geometry
 */
function convertKMLLineString(lineStringElement) {
  const coordsElement = lineStringElement.getElementsByTagName('coordinates')[0];
  if (!coordsElement) {
    throw new Error('LineString missing coordinates');
  }

  const coordsText = coordsElement.textContent.trim();
  const coordinates = parseKMLCoordinates(coordsText);

  return {
    type: 'LineString',
    coordinates: coordinates
  };
}

/**
 * Convert KML Polygon to GeoJSON geometry
 */
function convertKMLPolygon(polygonElement) {
  const outerBoundary = polygonElement.getElementsByTagName('outerBoundaryIs')[0];
  if (!outerBoundary) {
    throw new Error('Polygon missing outer boundary');
  }

  const linearRing = outerBoundary.getElementsByTagName('LinearRing')[0];
  if (!linearRing) {
    throw new Error('Polygon missing LinearRing');
  }

  const coordsElement = linearRing.getElementsByTagName('coordinates')[0];
  if (!coordsElement) {
    throw new Error('Polygon missing coordinates');
  }

  const coordsText = coordsElement.textContent.trim();
  const coordinates = parseKMLCoordinates(coordsText);

  return {
    type: 'Polygon',
    coordinates: [coordinates]
  };
}

/**
 * Parse KML coordinates string
 */
function parseKMLCoordinates(coordsText) {
  const coordinates = [];
  const coordPairs = coordsText.trim().split(/\s+/);
  
  for (const pair of coordPairs) {
    const coords = pair.split(',').map(c => parseFloat(c.trim()));
    if (coords.length >= 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
      coordinates.push([coords[0], coords[1]]);
    }
  }
  
  return coordinates;
}

/**
 * Process Shapefile (ZIP) and convert to GeoJSON
 * @param {ArrayBuffer} arrayBuffer - the shapefile data
 * @returns {Promise<Object>} - GeoJSON object
 */
async function processShapefileData(arrayBuffer) {
  if (typeof shp === 'undefined') {
    throw new Error('مكتبة Shapefile غير محملة');
  }

  try {
    const geojson = await shp(arrayBuffer);
    if (!geojson || !geojson.features || geojson.features.length === 0) {
      throw new Error('لم يتم العثور على بيانات صالحة في ملف Shapefile');
    }
    return geojson;
  } catch (error) {
    // Try to handle as ZIP file
    if (typeof JSZip !== 'undefined') {
      try {
        const zip = await JSZip.loadAsync(arrayBuffer);
        // Locate the .shp file inside the archive (ignore directory entries and handle
        // any mix of upper/lower-case or trailing spaces).
        const shpFileEntry = Object.keys(zip.files).find(name => {
          const entry = zip.files[name];
          return !entry.dir && name.trim().toLowerCase().endsWith('.shp');
        });

        if (!shpFileEntry) {
          // If the archive lacks .shp but includes a .geojson, this is probably a fallback
          // export created when the shapefile library was unavailable. In that case, we
          // will parse the GeoJSON and import it transparently instead of failing.

          const geojsonEntryKey = Object.keys(zip.files).find(name => {
            const entry = zip.files[name];
            return !entry.dir && name.trim().toLowerCase().endsWith('.geojson');
          });

          if (geojsonEntryKey) {
            console.warn('الأرشيف لا يحتوي على Shapefile ولكنه يحتوي على GeoJSON - سيتم استيراده كـ GeoJSON');
            const geojsonText = await zip.file(geojsonEntryKey).async('string');
            try {
              const parsedGeoJSON = JSON.parse(geojsonText);
              return parsedGeoJSON;
            } catch (jsonErr) {
              throw new Error('تعذر تحليل ملف GeoJSON داخل الأرشيف: ' + jsonErr.message);
            }
          }

          // Helpful debug: list archive contents in the console so the user can see what was actually zipped.
          console.warn('محتويات الأرشيف (لا تحتوي على .shp):', Object.keys(zip.files));
          throw new Error('لم يتم العثور على ملف .shp في الأرشيف، كما لا يوجد GeoJSON بديل. تأكد من أن الأرشيف يحتوي على ملفات ‎.shp، ‎.shx، ‎.dbf‎ أو ملف ‎.geojson‎.');
        }

        const shpBuffer = await zip.file(shpFileEntry).async('arraybuffer');

        // The .dbf is optional; if it is missing we still render geometry but without attributes.
        const dbfFileEntry = Object.keys(zip.files).find(name => {
          const entry = zip.files[name];
          return !entry.dir && name.trim().toLowerCase().endsWith('.dbf');
        });

        let dbfBuffer;
        if (dbfFileEntry) {
          dbfBuffer = await zip.file(dbfFileEntry).async('arraybuffer');
        }

        return await shp({
          shp: shpBuffer,
          dbf: dbfBuffer
        });
      } catch (zipError) {
        throw new Error(`فشل في معالجة أرشيف ZIP: ${zipError.message}`);
      }
    }
    throw new Error(`فشل في معالجة ملف Shapefile: ${error.message}`);
  }
}

/**
 * Process CSV file and convert to GeoJSON
 * @param {string} csvContent - the CSV file content
 * @returns {Object} - GeoJSON object
 */
function processCSVFile(csvContent) {
  if (!csvContent || typeof csvContent !== 'string') {
    throw new Error('محتوى ملف CSV فارغ أو غير صالح');
  }

  try {
    const lines = csvContent.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('ملف CSV يجب أن يحتوي على رأس وسجل واحد على الأقل');
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const features = [];

    // Find coordinate columns - more flexible search
    const latColumns = headers.findIndex(h => {
      const lower = h.toLowerCase();
      return lower.includes('lat') || lower.includes('y') || lower.includes('عرض') || 
             lower.includes('latitude') || lower.includes('y_coord') || lower.includes('northing');
    });
    
    const lngColumns = headers.findIndex(h => {
      const lower = h.toLowerCase();
      return lower.includes('lng') || lower.includes('lon') || lower.includes('x') || lower.includes('طول') ||
             lower.includes('longitude') || lower.includes('x_coord') || lower.includes('easting');
    });

    if (latColumns === -1 || lngColumns === -1) {
      const availableColumns = headers.join(', ');
      throw new Error(`لم يتم العثور على أعمدة الإحداثيات في ملف CSV. الأعمدة المتاحة: ${availableColumns}. يجب وجود أعمدة تحتوي على lat/latitude/y أو lng/longitude/x`);
    }

    console.log(`تم العثور على أعمدة الإحداثيات: خط العرض = ${headers[latColumns]}, خط الطول = ${headers[lngColumns]}`);

    let validRows = 0;
    let invalidRows = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue; // Skip empty lines
      
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      
      if (values.length !== headers.length) {
        invalidRows++;
        console.warn(`الصف ${i + 1}: عدد الأعمدة غير متطابق (متوقع: ${headers.length}, فعلي: ${values.length})`);
        continue;
      }

      const lat = parseFloat(values[latColumns]);
      const lng = parseFloat(values[lngColumns]);

      if (isNaN(lat) || isNaN(lng)) {
        invalidRows++;
        console.warn(`الصف ${i + 1}: إحداثيات غير صالحة (lat: ${values[latColumns]}, lng: ${values[lngColumns]})`);
        continue;
      }

      // Validate coordinate ranges
      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        invalidRows++;
        console.warn(`الصف ${i + 1}: إحداثيات خارج النطاق المسموح (lat: ${lat}, lng: ${lng})`);
        continue;
      }

      const properties = {};
      headers.forEach((header, index) => {
        if (index !== latColumns && index !== lngColumns) {
          properties[header] = values[index];
        }
      });

      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        properties: properties
      });
      
      validRows++;
    }

    if (features.length === 0) {
      throw new Error(`لم يتم العثور على أي بيانات صالحة في ملف CSV. تم معالجة ${lines.length - 1} صف، ${invalidRows} صف غير صالح`);
    }

    console.log(`تم معالجة ملف CSV بنجاح: ${validRows} صف صالح، ${invalidRows} صف غير صالح`);

    return {
      type: 'FeatureCollection',
      features: features
    };
  } catch (error) {
    throw new Error(`فشل في معالجة ملف CSV: ${error.message}`);
  }
}

/**
 * Main import function that handles all file formats
 * @param {File} file - the file to import
 */
async function importLayerFromFile(file) {
  if (!file) {
    showNotification('لم يتم تحديد ملف للاستيراد', 'error');
    return;
  }

  const fileExtension = file.name.split('.').pop().toLowerCase();
  const supportedFormats = ['geojson', 'json', 'kml', 'shp', 'zip', 'csv'];
  
  if (!supportedFormats.includes(fileExtension)) {
    showNotification(`صيغة الملف غير مدعومة: .${fileExtension}. الصيغ المدعومة: ${supportedFormats.join(', ')}`, 'error');
    return;
  }

  // Check file size (max 50MB)
  const maxFileSize = 50 * 1024 * 1024; // 50MB in bytes
  if (file.size > maxFileSize) {
    showNotification(`حجم الملف كبير جداً. الحد الأقصى المسموح: 50 ميجابايت`, 'error');
    return;
  }

  showNotification(`جاري معالجة الملف: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} ميجابايت)`, 'info');

  try {
    let geojson;
    
    if (fileExtension === 'geojson' || fileExtension === 'json') {
      const content = await readFileAsText(file);
      try {
        geojson = JSON.parse(content);
      } catch (parseError) {
        throw new Error('ملف JSON غير صالح - يحتوي على أخطاء في التنسيق');
      }
      
      if (!geojson.type || !geojson.features) {
        throw new Error('تنسيق GeoJSON غير صالح - يجب أن يحتوي على type و features');
      }
      
      if (!Array.isArray(geojson.features)) {
        throw new Error('تنسيق GeoJSON غير صالح - features يجب أن تكون مصفوفة');
      }
    } 
    else if (fileExtension === 'kml') {
      const content = await readFileAsText(file);
      geojson = processKMLFile(content);
    }
    else if (fileExtension === 'zip' || fileExtension === 'shp') {
      // Check if required libraries are available
      if (typeof shp === 'undefined') {
        throw new Error('مكتبة معالجة Shapefile غير محملة. يرجى إعادة تحميل الصفحة');
      }
      
      const arrayBuffer = await fileToArrayBuffer(file);
      geojson = await processShapefileData(arrayBuffer);
    }
    else if (fileExtension === 'csv') {
      const content = await readFileAsText(file);
      geojson = processCSVFile(content);
    }

    if (!geojson || !geojson.features || geojson.features.length === 0) {
      throw new Error('لم يتم العثور على بيانات صالحة في الملف. تأكد من أن الملف يحتوي على معلومات جغرافية');
    }

    // Clean and validate coordinates
    const originalCount = geojson.features.length;
    const cleanedFeatures = geojson.features.map(feature => {
      if (!feature.geometry || !feature.geometry.coordinates) {
        return null;
      }
      
      try {
        feature.geometry.coordinates = validateCoordinates(feature.geometry.coordinates);
        return feature;
      } catch (coordError) {
        console.warn('تجاهل عنصر بإحداثيات غير صالحة:', coordError);
        return null;
      }
    }).filter(feature => 
      feature !== null && 
      feature.geometry && 
      feature.geometry.coordinates && 
      feature.geometry.coordinates.length > 0
    );

    if (cleanedFeatures.length === 0) {
      throw new Error('لم يتم العثور على أي عناصر بإحداثيات صالحة. تأكد من أن الملف يحتوي على إحداثيات جغرافية صحيحة');
    }

    const cleanedGeoJSON = {
      type: 'FeatureCollection',
      features: cleanedFeatures
    };

    // Add to map
    if (!window.map) {
      throw new Error('الخريطة غير محملة. يرجى إعادة تحميل الصفحة');
    }
    
    addGeoJSONToMap(cleanedGeoJSON, file.name);
    
    const statusMessage = originalCount === cleanedFeatures.length 
      ? `تم استيراد ${cleanedFeatures.length} عنصر بنجاح من ${file.name}`
      : `تم استيراد ${cleanedFeatures.length} من ${originalCount} عنصر من ${file.name} (تم تجاهل ${originalCount - cleanedFeatures.length} عنصر بإحداثيات غير صالحة)`;
    
    showNotification(statusMessage, 'success');
    
  } catch (error) {
    console.error('خطأ في استيراد الملف:', error);
    
    // Provide more specific error messages
    let errorMessage = error.message;
    if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
      errorMessage = 'خطأ في الاتصال - يرجى التحقق من اتصال الإنترنت';
    } else if (error.message.includes('JSON')) {
      errorMessage = 'خطأ في تحليل الملف - تأكد من أن الملف بصيغة صحيحة';
    } else if (error.message.includes('coordinates')) {
      errorMessage = 'خطأ في الإحداثيات - تأكد من أن الملف يحتوي على إحداثيات جغرافية صحيحة';
    }
    
    showNotification(`خطأ في استيراد الملف: ${errorMessage}`, 'error');
  }
}

/**
 * Read file as text
 * @param {File} file - the file to read
 * @returns {Promise<string>} - the file content
 */
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

/**
 * Add GeoJSON data to map
 * @param {Object} geojson - the GeoJSON data
 * @param {string} fileName - the file name
 */
function addGeoJSONToMap(geojson, fileName) {
  if (!window.map) {
    throw new Error('الخريطة غير محملة');
  }

  window.importedLayerCounter++;
  const layerId = `imported-layer-${window.importedLayerCounter}`;
  
  // Create layer with styling
  const layer = L.geoJSON(geojson, {
    style: function(feature) {
      return {
        fillColor: '#4CAF50',
            weight: 2,
            opacity: 1,
        color: '#388E3C',
        dashArray: '3',
        fillOpacity: 0.7
      };
    },
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 8,
        fillColor: '#4CAF50',
        color: '#388E3C',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
    },
    onEachFeature: function(feature, layer) {
      const properties = feature.properties || {};
            const popupContent = `
              <div class="popup-header">
          <h3 class="popup-title">${properties.name || properties.Name || 'معلم مستورد'}</h3>
              </div>
              <div class="popup-body">
                ${Object.entries(properties)
            .filter(([key]) => key !== 'name' && key !== 'Name')
            .map(([key, value]) => `
                    <div class="popup-stat">
                      <span>${key}:</span>
                      <strong>${value}</strong>
                    </div>
            `).join('')}
              </div>
            `;
            layer.bindPopup(popupContent);
    }
  }).addTo(window.map);

  // Store layer
  window.importedLayers[layerId] = layer;
  
  // Zoom to layer
  window.map.fitBounds(layer.getBounds());
  
  // Add to layer list
  addLayerToList(layerId, fileName, layer);
}

/**
 * Add imported layer to the layer list
 * @param {string} layerId - the layer ID
 * @param {string} fileName - the file name
 * @param {Object} layer - the Leaflet layer
 */
function addLayerToList(layerId, fileName, layer) {
  const layersList = document.getElementById('layersList');
  if (!layersList) return;

  const layerItem = document.createElement('div');
  layerItem.className = 'layer-item imported-layer';
  layerItem.innerHTML = `
    <div class="layer-checkbox">
      <input type="checkbox" id="${layerId}" checked>
    </div>
    <div class="layer-icon">
      <i class="fas fa-map-marked-alt layer-icon-imported"></i>
            </div>
    <span class="layer-name">${fileName} (مستورد)</span>
            <div class="layer-actions">
      <button class="layer-action-btn" data-action="zoom" data-layer="${layerId}" title="تكبير للطبقة">
                <i class="fas fa-search-plus"></i>
              </button>
      <button class="layer-action-btn" data-action="remove" data-layer="${layerId}" title="حذف الطبقة">
        <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          `;

  layersList.appendChild(layerItem);

  // Add event listeners
  const checkbox = layerItem.querySelector(`#${layerId}`);
  const zoomBtn = layerItem.querySelector('[data-action="zoom"]');
  const removeBtn = layerItem.querySelector('[data-action="remove"]');

  if (checkbox) {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        window.map.addLayer(layer);
      } else {
        window.map.removeLayer(layer);
      }
    });
  }

          if (zoomBtn) {
    zoomBtn.addEventListener('click', function() {
      window.map.fitBounds(layer.getBounds());
            });
          }

          if (removeBtn) {
    removeBtn.addEventListener('click', function() {
      window.map.removeLayer(layer);
      delete window.importedLayers[layerId];
      layerItem.remove();
      showNotification('تم حذف الطبقة', 'success');
            });
          }
        }

// Export functions globally
window.importLayerFromFile = importLayerFromFile;
window.addGeoJSONToMap = addGeoJSONToMap;
window.processKMLFile = processKMLFile;
window.processShapefileData = processShapefileData;
window.processCSVFile = processCSVFile;
window.showNotification = showNotification;
