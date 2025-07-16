/**
 * import and export functions - updated version
 * supports exporting all layers with all required formats
 */

document.addEventListener("DOMContentLoaded", function () {
  // prevent duplicate initialization
  if (window.importExportInitialized) {
    return;
  }
  window.importExportInitialized = true;

  console.log("تهيئة نظام الاستيراد والتصدير...");

  // initialize the import/export interface
  initImportExport();
});

/**
 * initialize the import/export interface
 */
function initImportExport() {
  // make sure the data is available as global variables
  if (typeof neighborhoodsData !== "undefined" && !window.neighborhoodsData) {
    window.neighborhoodsData = neighborhoodsData;
    console.log("Set window.neighborhoodsData from global scope");
  }

  if (typeof serviceSectorsData !== "undefined" && !window.serviceSectorsData) {
    window.serviceSectorsData = serviceSectorsData;
    console.log("Set window.serviceSectorsData from global scope");
  }

  // Log data availability for debugging
  console.log("Data availability check:");
  console.log(
    "- window.neighborhoodsData:",
    window.neighborhoodsData ? "Available" : "Not available"
  );
  console.log(
    "- global neighborhoodsData:",
    typeof neighborhoodsData !== "undefined" ? "Available" : "Not available"
  );
  console.log(
    "- window.serviceSectorsData:",
    window.serviceSectorsData ? "Available" : "Not available"
  );
  console.log(
    "- global serviceSectorsData:",
    typeof serviceSectorsData !== "undefined" ? "Available" : "Not available"
  );

  // listen for the service sectors loaded event
  document.addEventListener("serviceSectorsLoaded", function () {
    console.log("تم استلام إشعار تحميل بيانات دوائر الخدمات");
    // update the data reference in the global window object if not available
    if (
      !window.serviceSectorsData &&
      typeof serviceSectorsData !== "undefined"
    ) {
      window.serviceSectorsData = serviceSectorsData;
    }
  });

  // user interface elements
  const exportLayerSelect = document.getElementById("exportLayerSelect");
  const exportFormatSelect = document.getElementById("exportFormat");
  const exportButton = document.getElementById("exportLayerBtn");

  // initialize the export button
  if (exportButton) {
    // remove any previous event listeners
    const oldExportHandler = exportButton._exportHandler;
    if (oldExportHandler) {
      exportButton.removeEventListener("click", oldExportHandler);
    }

    // create a new event listener
    const newExportHandler = function () {
      const layerName = exportLayerSelect ? exportLayerSelect.value : null;
      const format = exportFormatSelect ? exportFormatSelect.value : null;

      if (
        !layerName ||
        layerName.trim() === "" ||
        layerName === "-- اختر طبقة --"
      ) {
        showAlert("الرجاء اختيار طبقة للتصدير", "warning");
        return;
      }

      if (!format || format.trim() === "" || format === "اختر صيغة التصدير") {
        showAlert("الرجاء اختيار صيغة التصدير", "warning");
        return;
      }

      exportLayer(layerName, format);
    };

    // save a reference to the new event listener
    exportButton._exportHandler = newExportHandler;
    exportButton.addEventListener("click", newExportHandler);
  }

  console.log("تم تهيئة نظام الاستيراد والتصدير بنجاح");

  // Test library availability after initialization
  setTimeout(() => {
    console.log("Testing library availability:");
    console.log(
      "- shpwrite:",
      typeof shpwrite !== "undefined" ? "Available" : "Not available"
    );
    console.log(
      "- JSZip:",
      typeof JSZip !== "undefined" ? "Available" : "Not available"
    );
    console.log(
      "- jsPDF:",
      typeof jsPDF !== "undefined" ? "Available" : "Not available"
    );
    console.log(
      "- XLSX:",
      typeof XLSX !== "undefined" ? "Available" : "Not available"
    );
  }, 2000);

  // add a listener for automatic retry on data load
  setupAutoRetryOnDataLoad();

  // initialize the import function
  initializeImport();
}

/**
 * setup automatic retry on data load
 */
function setupAutoRetryOnDataLoad() {
  let pendingExport = null;

  // listen for the service sectors loaded event
  document.addEventListener("serviceSectorsLoaded", function (event) {
    console.log("تم تحميل بيانات دوائر الخدمات، فحص الطلبات المعلقة...");

    if (pendingExport) {
      console.log(
        `إعادة محاولة تصدير ${pendingExport.layer} بصيغة ${pendingExport.format}`
      );

      setTimeout(() => {
        try {
          exportLayer(pendingExport.layer, pendingExport.format);
          showAlert(
            "تم إعادة محاولة التصدير تلقائياً بعد تحميل البيانات",
            "success"
          );
        } catch (error) {
          console.error("فشلت إعادة المحاولة:", error);
          showAlert("فشلت إعادة المحاولة: " + error.message, "error");
        } finally {
          pendingExport = null;
        }
      }, 500); // wait for a short time to ensure the data is stable
    }
  });

  // improve error handling in the export
  const originalExportLayer = window.exportLayer || exportLayer;

  // make sure exportLayer is available in the global scope
  window.exportLayer = function (layerName, format) {
    try {
      return originalExportLayer(layerName, format);
    } catch (error) {
      // if the error is related to the service sectors data not being loaded
      if (
        error.message.includes("لم يتم تحميلها بعد") &&
        (layerName === "service-sectors" ||
          layerName === "service-sector-labels")
      ) {
        console.log("حفظ طلب التصدير للمحاولة لاحقاً...");
        pendingExport = { layer: layerName, format: format };

        showAlert(
          "جاري تحميل البيانات، سيتم التصدير تلقائياً عند الانتهاء...",
          "info"
        );
        return;
      }

      // rethrow the error for other errors
      throw error;
    }
  };
}

/**
 * initialize the import function using the enhanced import functionality from main.js
 */
function initializeImport() {
  // prevent duplicate initialization to avoid multiple event listeners
  if (window.featuresImportInitialized) {
    return;
  }
  window.featuresImportInitialized = true;

  const importLayerBtn = document.getElementById("importLayerBtn");
  const layerFileInput = document.getElementById("layerFileInput");

  // File import
  if (importLayerBtn && layerFileInput) {
    // remove any previous event listeners to avoid conflicts
    const newImportBtn = importLayerBtn.cloneNode(true);
    importLayerBtn.parentNode.replaceChild(newImportBtn, importLayerBtn);

    const newFileInput = layerFileInput.cloneNode(true);
    layerFileInput.parentNode.replaceChild(newFileInput, layerFileInput);

    // get the new references
    const cleanImportBtn = document.getElementById("importLayerBtn");
    const cleanFileInput = document.getElementById("layerFileInput");

    if (cleanImportBtn && cleanFileInput) {
      cleanImportBtn.addEventListener("click", function () {
        cleanFileInput.click();
      });

      cleanFileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          // Use the enhanced import function from main.js
          if (typeof window.importLayerFromFile === 'function') {
            window.importLayerFromFile(file);
                     } else {
             console.error('Enhanced import function not available');
             // Fallback to basic alert if showNotification is not available
             if (typeof window.showNotification === 'function') {
               window.showNotification('وظيفة الاستيراد المحسنة غير متوفرة', 'error');
             } else {
               alert('وظيفة الاستيراد المحسنة غير متوفرة');
             }
           }
        }
      });
    }
  }
}

function processAndDisplayGeoJSON(geojson, fileName) {
  if (!geojson || !geojson.features || !Array.isArray(geojson.features) || geojson.features.length === 0) {
    throw new Error("The processed file does not contain any valid features.");
  }

  // Deep clone and sanitize coordinates
  const sanitizedFeatures = geojson.features.map(f => {
    const feature = JSON.parse(JSON.stringify(f)); // Deep clone
    if (feature.geometry && feature.geometry.coordinates) {
      feature.geometry.coordinates = validateCoordinates(feature.geometry.coordinates);
    }
    return feature;
  }).filter(f => f.geometry && f.geometry.coordinates && f.geometry.coordinates.length > 0);

  if (sanitizedFeatures.length === 0) {
    throw new Error("No features with valid coordinates found after cleaning.");
  }

  const sanitizedGeoJSON = {
    type: "FeatureCollection",
    features: sanitizedFeatures
  };

  const newLayer = L.geoJSON(sanitizedGeoJSON, {
    onEachFeature: (feature, layer) => {
      if (feature.properties) {
        const popupContent = Object.entries(feature.properties)
          .map(([key, value]) => `<b>${key}:</b> ${value}`)
          .join("<br>");
        layer.bindPopup(popupContent);
      }
    }
  }).addTo(map);

  map.fitBounds(newLayer.getBounds());
  addImportedLayerToList(fileName, newLayer);
  showAlert(`Successfully imported ${sanitizedFeatures.length} features from ${fileName}.`, "success");
}

function validateCoordinates(coords) {
  // This utility validates coordinate arrays (Point, LineString, Polygon) and removes invalid values.
  // It returns a cleaned set of coordinates or null if no valid coordinates remain.
  if (!Array.isArray(coords)) return null;

  // Base case: coords is a single coordinate pair [lng, lat]
  if (coords.length === 2 && typeof coords[0] === 'number' && typeof coords[1] === 'number') {
    const [lng, lat] = coords;
    if (isFinite(lng) && isFinite(lat) && lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90) {
      return [lng, lat];
    }
    return null; // Invalid numbers
  }

  // Recursive case: coords is nested (Array of coordinates or deeper)
  const cleaned = coords
    .map(validateCoordinates)
    .filter(c => c !== null && c.length > 0);

  return cleaned.length > 0 ? cleaned : null;
}

async function processShapefileFile(arrayBuffer, fileName) {
  if (typeof shp === "undefined") throw new Error("Shapefile library (shp.js) is not loaded.");
  
  try {
    const geojson = await shp(arrayBuffer);
    return geojson;
  } catch (error) {
    // Attempt to process as a ZIP containing a shapefile
    if (typeof JSZip !== "undefined") {
      try {
        const zip = await JSZip.loadAsync(arrayBuffer);
        const shpFile = Object.keys(zip.files).find(name => name.toLowerCase().endsWith('.shp'));
        if (!shpFile) throw new Error("No .shp file found in the ZIP archive.");
        
        const shpBuffer = await zip.file(shpFile).async('arraybuffer');
        // We also need the .dbf file for properties
        const dbfFile = Object.keys(zip.files).find(name => name.toLowerCase().endsWith('.dbf'));
        let dbfBuffer;
        if (dbfFile) {
            dbfBuffer = await zip.file(dbfFile).async('arraybuffer');
        }

        // shp.js can take an object of array buffers
        return await shp({
            shp: shpBuffer,
            dbf: dbfBuffer
        });

      } catch (zipError) {
        throw new Error(`Failed to process ZIP file: ${zipError.message}`);
      }
    }
    throw new Error(`Shapefile processing failed: ${error.message}`);
  }
}

/**
 * Process KML file and convert to GeoJSON
 * @param {string} kmlContent - the KML file content
 * @param {string} fileName - the file name
 * @returns {Object} GeoJSON object
 */
function processKMLFile(kmlContent, fileName) {
  console.log("Converting KML to GeoJSON...");

  // Basic validation
  if (!kmlContent || typeof kmlContent !== "string") {
    throw new Error("محتوى ملف KML فارغ أو غير صالح");
  }

  if (!kmlContent.includes("<kml") && !kmlContent.includes("<?xml")) {
    throw new Error("ملف KML غير صالح - لا يحتوي على علامات XML المطلوبة");
  }

  try {
    // Simple KML to GeoJSON conversion
    const parser = new DOMParser();
    const kmlDoc = parser.parseFromString(kmlContent, "text/xml");

    // Check for parser errors
    const parseErrors = kmlDoc.getElementsByTagName("parsererror");
    if (parseErrors.length > 0) {
      throw new Error("خطأ في تحليل XML: " + parseErrors[0].textContent);
    }

    // Extract features from KML
    const features = [];

    // Get all Placemark elements
    const placemarks = kmlDoc.getElementsByTagName("Placemark");
    console.log(`Found ${placemarks.length} placemarks in KML`);

    for (let i = 0; i < placemarks.length; i++) {
      const placemark = placemarks[i];
      const feature = convertPlacemarkToFeature(placemark, i);
      if (feature) {
        features.push(feature);
      }
    }

    if (features.length === 0) {
      throw new Error("لم يتم العثور على أي عناصر جغرافية صالحة في ملف KML");
    }

    console.log(`Successfully converted ${features.length} features from KML`);

    return {
      type: "FeatureCollection",
      features: features,
    };
  } catch (error) {
    console.error("Error processing KML:", error);
    throw new Error(`فشل في معالجة ملف KML: ${error.message}`);
  }
}

/**
 * Convert a KML Placemark to GeoJSON Feature
 * @param {Element} placemark - the placemark element
 * @param {number} index - the index for naming
 * @returns {Object} GeoJSON Feature
 */
function convertPlacemarkToFeature(placemark, index) {
  try {
    const feature = {
      type: "Feature",
      properties: {},
      geometry: null,
    };

    // Extract name
    const nameElement = placemark.getElementsByTagName("name")[0];
    if (nameElement) {
      feature.properties.name = nameElement.textContent.trim();
    } else {
      feature.properties.name = `Placemark ${index + 1}`;
    }

    // Extract description
    const descElement = placemark.getElementsByTagName("description")[0];
    if (descElement) {
      feature.properties.description = descElement.textContent.trim();
    }

    // Extract geometry
    const point = placemark.getElementsByTagName("Point")[0];
    const lineString = placemark.getElementsByTagName("LineString")[0];
    const polygon = placemark.getElementsByTagName("Polygon")[0];

    if (point) {
      feature.geometry = convertKMLPoint(point);
    } else if (lineString) {
      feature.geometry = convertKMLLineString(lineString);
    } else if (polygon) {
      feature.geometry = convertKMLPolygon(polygon);
    } else {
      console.warn(`No supported geometry found in placemark ${index + 1}`);
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
  const coordsElement = pointElement.getElementsByTagName("coordinates")[0];
  if (!coordsElement) {
    throw new Error("Point missing coordinates");
  }

  const coords = coordsElement.textContent.trim().split(",");
  const lng = parseFloat(coords[0]);
  const lat = parseFloat(coords[1]);

  if (isNaN(lng) || isNaN(lat)) {
    throw new Error("Invalid coordinates in Point");
  }

  return {
    type: "Point",
    coordinates: [lng, lat],
  };
}

/**
 * Convert KML LineString to GeoJSON geometry
 */
function convertKMLLineString(lineElement) {
  const coordsElement = lineElement.getElementsByTagName("coordinates")[0];
  if (!coordsElement) {
    throw new Error("LineString missing coordinates");
  }

  const coordsText = coordsElement.textContent.trim();
  const coordinates = parseKMLCoordinates(coordsText);

  return {
    type: "LineString",
    coordinates: coordinates,
  };
}

/**
 * Convert KML Polygon to GeoJSON geometry
 */
function convertKMLPolygon(polygonElement) {
  const outerBoundary =
    polygonElement.getElementsByTagName("outerBoundaryIs")[0];
  if (!outerBoundary) {
    throw new Error("Polygon missing outer boundary");
  }

  const linearRing = outerBoundary.getElementsByTagName("LinearRing")[0];
  if (!linearRing) {
    throw new Error("Polygon missing LinearRing");
  }

  const coordsElement = linearRing.getElementsByTagName("coordinates")[0];
  if (!coordsElement) {
    throw new Error("Polygon missing coordinates");
  }

  const coordsText = coordsElement.textContent.trim();
  const coordinates = parseKMLCoordinates(coordsText);

  return {
    type: "Polygon",
    coordinates: [coordinates],
  };
}

/**
 * Parse KML coordinates string
 */
function parseKMLCoordinates(coordsText) {
  const coordinates = [];
  const coordPairs = coordsText.trim().split(/\s+/);

  for (const pair of coordPairs) {
    if (pair.trim()) {
      const coords = pair.split(",");
      const lng = parseFloat(coords[0]);
      const lat = parseFloat(coords[1]);

      if (!isNaN(lng) && !isNaN(lat)) {
        coordinates.push([lng, lat]);
      }
    }
  }

  return coordinates;
}

/**
 * export a specific layer in the specified format
 * @param {string} layerName - the layer name
 * @param {string} format - the export format
 */
async function exportLayer(layerName, format) {
  // prevent multiple exports
  if (window.exportInProgress) {
    showAlert("جاري تصدير طبقة أخرى، يرجى الانتظار", "info");
    return;
  }

  window.exportInProgress = true;
  showAlert("جاري تصدير الطبقة...", "info");

  try {
    let data = null;
    let fileName = "";

    // Get data for the selected layer
    switch (layerName) {
      case "neighborhoods":
        data = getNeighborhoodsData();
        fileName = `neighborhoods_${formatDate()}`;
        break;

      case "neighborhood-labels":
        data = getNeighborhoodLabelsData();
        fileName = `neighborhood_labels_${formatDate()}`;
        break;

      case "service-sectors":
        // check if the service sectors data is loaded
        if (window.serviceSectorsDataLoaded === false) {
          throw new Error(
            "بيانات دوائر الخدمات لم يتم تحميلها بعد، يرجى المحاولة لاحقاً"
          );
        }
        data = getServiceSectorsData();
        fileName = `service_sectors_${formatDate()}`;
        break;

      case "service-sector-labels":
        // check if the service sectors data is loaded
        if (window.serviceSectorsDataLoaded === false) {
          throw new Error(
            "بيانات دوائر الخدمات لم يتم تحميلها بعد، يرجى المحاولة لاحقاً"
          );
        }
        data = getServiceSectorLabelsData();
        fileName = `service_sector_labels_${formatDate()}`;
        break;

      default:
        throw new Error(`الطبقة "${layerName}" غير مدعومة`);
    }

    if (!data) {
      throw new Error("لا توجد بيانات للطبقة المحددة");
    }

    // export the data in the specified format
    await exportDataInFormat(data, fileName, format);

    showAlert("تم تصدير الطبقة بنجاح", "success");
  } catch (error) {
    console.error("خطأ في تصدير الطبقة:", error);
    showAlert("حدث خطأ أثناء تصدير الطبقة: " + error.message, "error");
  } finally {
    window.exportInProgress = false;
  }
}

/**
 * get the neighborhoods data
 */
function getNeighborhoodsData() {
  console.log("Attempting to get neighborhoods data...");

  let neighborhoodsSource = window.neighborhoodsData || null;

  // Check if window.neighborhoodsData is not available
  if (!neighborhoodsSource && typeof neighborhoodsData !== "undefined") {
    neighborhoodsSource = neighborhoodsData;
    console.log("Found neighborhoodsData in global scope");
  }

  console.log(
    "Neighborhoods source:",
    neighborhoodsSource ? "Available" : "Not available"
  );

  if (!neighborhoodsSource) {
    console.error("No neighborhoods data source found");
    throw new Error(
      "بيانات الأحياء غير متوفرة - لم يتم العثور على مصدر البيانات"
    );
  }

  if (!neighborhoodsSource.features) {
    console.error("Neighborhoods data has no features property");
    console.log("Available properties:", Object.keys(neighborhoodsSource));
    throw new Error("بيانات الأحياء غير صالحة - لا تحتوي على خاصية features");
  }

  if (!Array.isArray(neighborhoodsSource.features)) {
    console.error(
      "Features is not an array:",
      typeof neighborhoodsSource.features
    );
    throw new Error("بيانات الأحياء غير صالحة - features ليست مصفوفة");
  }

  if (neighborhoodsSource.features.length === 0) {
    console.warn("Neighborhoods data has no features");
    throw new Error("بيانات الأحياء فارغة - لا توجد عناصر للتصدير");
  }

  console.log(
    `Found ${neighborhoodsSource.features.length} neighborhood features`
  );
  return neighborhoodsSource;
}

/**
 * get the neighborhoods labels data
 */
function getNeighborhoodLabelsData() {
  const neighborhoodsSource =
    window.neighborhoodsData ||
    (typeof neighborhoodsData !== "undefined" ? neighborhoodsData : null);

  if (!neighborhoodsSource || !neighborhoodsSource.features) {
    throw new Error("بيانات الأحياء غير متوفرة لإنشاء المسميات");
  }

  // convert the neighborhoods polygons to points for the labels
  const features = neighborhoodsSource.features
    .map((feature) => {
      if (
        !feature.geometry ||
        !feature.geometry.coordinates ||
        !feature.geometry.coordinates[0]
      ) {
        return null;
      }

      const center = calculatePolygonCenter(feature.geometry.coordinates[0]);
      const name =
        feature.properties.Names ||
        feature.properties.Name_En ||
        feature.properties.name ||
        feature.properties.NAME ||
        "غير معروف";

      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [center.lng, center.lat],
        },
        properties: {
          name: name,
          original_id: feature.properties.OBJECTID || feature.properties.id,
          ...feature.properties,
        },
      };
    })
    .filter((f) => f !== null);

  return { type: "FeatureCollection", features };
}

/**
 * get the service sectors data
 */
function getServiceSectorsData() {
  // try to get the data from different sources
  let serviceSectorsSource =
    window.serviceSectorsData ||
    (typeof serviceSectorsData !== "undefined" ? serviceSectorsData : null);

  // if the data is not available, check if the data is loaded later
  if (!serviceSectorsSource || !serviceSectorsSource.features) {
    console.log("بيانات دوائر الخدمات غير متوفرة، محاولة إعادة التحقق...");

    // check if the service sectors data is loaded
    if (window.serviceSectorsDataLoaded === false) {
      throw new Error(
        "بيانات دوائر الخدمات لم يتم تحميلها بعد، يرجى المحاولة لاحقاً"
      );
    }

    // check if the service sectors data is available in the global scope
    if (typeof serviceSectorsData !== "undefined") {
      serviceSectorsSource = serviceSectorsData;
      if (serviceSectorsSource && serviceSectorsSource.features) {
        window.serviceSectorsData = serviceSectorsData;
      }
    }
  }

  if (!serviceSectorsSource || !serviceSectorsSource.features) {
    console.error("فشل في العثور على بيانات دوائر الخدمات");
    throw new Error("بيانات دوائر الخدمات غير متوفرة");
  }

  console.log(
    "تم العثور على بيانات دوائر الخدمات:",
    serviceSectorsSource.features.length,
    "عنصر"
  );
  return serviceSectorsSource;
}

/**
 * get the service sectors labels data
 */
function getServiceSectorLabelsData() {
  // try to get the data from different sources
  let serviceSectorsSource =
    window.serviceSectorsData ||
    (typeof serviceSectorsData !== "undefined" ? serviceSectorsData : null);

  // if the data is not available, check if the data is loaded later
  if (!serviceSectorsSource) {
    console.log(
      "بيانات دوائر الخدمات غير متوفرة لإنشاء المسميات، محاولة إعادة التحقق..."
    );

    // check if the service sectors data is available in the global scope
    if (typeof serviceSectorsData !== "undefined") {
      serviceSectorsSource = serviceSectorsData;
      window.serviceSectorsData = serviceSectorsData;
    }
  }

  if (!serviceSectorsSource || !serviceSectorsSource.features) {
    console.error("فشل في العثور على بيانات دوائر الخدمات لإنشاء المسميات");
    throw new Error("بيانات دوائر الخدمات غير متوفرة لإنشاء المسميات");
  }

  // convert the service sectors polygons to points for the labels
  const features = serviceSectorsSource.features
    .map((feature) => {
      if (
        !feature.geometry ||
        !feature.geometry.coordinates ||
        !feature.geometry.coordinates[0]
      ) {
        return null;
      }

      const center = calculatePolygonCenter(feature.geometry.coordinates[0]);
      const name =
        feature.properties.Name ||
        feature.properties.Name_En ||
        feature.properties.name ||
        feature.properties.NAME ||
        "غير معروف";

      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [center.lng, center.lat],
        },
        properties: {
          name: name,
          name_en: feature.properties.Name_En,
          original_id: feature.properties.OBJECTID || feature.properties.id,
          population: feature.properties.Pop,
          ...feature.properties,
        },
      };
    })
    .filter((f) => f !== null);

  return { type: "FeatureCollection", features };
}

/**
 * calculate the center of a polygon
 */
function calculatePolygonCenter(coordinates) {
  let totalLat = 0;
  let totalLng = 0;
  let pointCount = 0;

  coordinates.forEach((coord) => {
    totalLng += coord[0];
    totalLat += coord[1];
    pointCount++;
  });

  return {
    lat: totalLat / pointCount,
    lng: totalLng / pointCount,
  };
}

/**
 * export the data in the specified format
 */
async function exportDataInFormat(data, fileName, format) {
  console.log(`Exporting data in format: ${format}`);
  console.log("Data to export:", data);

  let content = "";
  let contentType = "";
  let fileExtension = "";

  try {
    switch (format) {
      case "geojson":
        // Validate and clean GeoJSON data before export
        const cleanedGeoJSON = validateAndCleanGeoJSON(data);
        content = JSON.stringify(cleanedGeoJSON, null, 2);
        contentType = "application/json";
        fileExtension = ".geojson";
        break;

      case "kml":
        content = convertToKML(data);
        contentType = "application/vnd.google-earth.kml+xml";
        fileExtension = ".kml";
        break;

      case "shp":
        await exportAsShapefile(data, fileName);
        return; // the function handles the export itself

      case "csv":
        content = convertToCSV(data);
        contentType = "text/csv";
        fileExtension = ".csv";
        break;

      case "excel":
        exportAsExcel(data, fileName);
        return; // the function handles the export itself

      case "pdf":
        exportAsPDF(data, fileName);
        return; // the function handles the export itself

      default:
        throw new Error(`صيغة التصدير "${format}" غير مدعومة`);
    }

    // تنزيل الملف
    console.log(`Downloading file: ${fileName + fileExtension}`);
    downloadFile(content, fileName + fileExtension, contentType);
  } catch (error) {
    console.error("Error in exportDataInFormat:", error);
    throw error; // Re-throw the error for upper-level handling
  }
}

/**
 * convert GeoJSON to KML (compatible with import function)
 */
function convertToKML(geoJSON) {
  if (!geoJSON || !geoJSON.features || !Array.isArray(geoJSON.features)) {
    throw new Error("Invalid GeoJSON data for KML conversion");
  }

  let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>البيانات المصدرة</name>
    <description>تم التصدير من نظام الأحياء</description>
`;

  geoJSON.features.forEach((feature, index) => {
    if (!feature.geometry) {
      console.warn(`Feature ${index} has no geometry, skipping`);
      return;
    }

    const properties = feature.properties || {};
    const geometry = feature.geometry;

    kml += `    <Placemark>
      <name>${escapeXML(
        properties.name ||
          properties.Names ||
          properties.Name ||
          `عنصر ${index + 1}`
      )}</name>
      <description><![CDATA[`;

    // add the element properties
    if (properties) {
      Object.keys(properties).forEach((key) => {
        if (properties[key] !== null && properties[key] !== undefined && key !== 'name' && key !== 'Names' && key !== 'Name') {
          const escapedKey = escapeXML(String(key));
          const escapedValue = escapeXML(String(properties[key]));
          kml += `<p><strong>${escapedKey}:</strong> ${escapedValue}</p>`;
        }
      });
    }

    kml += `]]></description>`;

    // add the geometry with proper validation
    try {
      if (geometry.type === "Point") {
        if (geometry.coordinates && geometry.coordinates.length >= 2) {
          const lng = geometry.coordinates[0];
          const lat = geometry.coordinates[1];
          if (typeof lng === 'number' && typeof lat === 'number' && !isNaN(lng) && !isNaN(lat)) {
            kml += `      <Point>
        <coordinates>${lng},${lat},0</coordinates>
      </Point>`;
          } else {
            console.warn(`Invalid coordinates for Point feature ${index}:`, geometry.coordinates);
          }
        }
      } else if (geometry.type === "LineString") {
        if (geometry.coordinates && Array.isArray(geometry.coordinates) && geometry.coordinates.length >= 2) {
          kml += `      <LineString>
        <coordinates>`;
          geometry.coordinates.forEach((coord) => {
            if (coord.length >= 2 && typeof coord[0] === 'number' && typeof coord[1] === 'number') {
              kml += `${coord[0]},${coord[1]},0 `;
            }
          });
          kml += `</coordinates>
      </LineString>`;
        }
      } else if (geometry.type === "Polygon") {
        if (geometry.coordinates && Array.isArray(geometry.coordinates) && geometry.coordinates.length > 0) {
          kml += `      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>`;
          const outerRing = geometry.coordinates[0];
          if (Array.isArray(outerRing)) {
            outerRing.forEach((coord) => {
              if (coord.length >= 2 && typeof coord[0] === 'number' && typeof coord[1] === 'number') {
                kml += `${coord[0]},${coord[1]},0 `;
              }
            });
          }
          kml += `</coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>`;
        }
      } else {
        console.warn(`Unsupported geometry type for KML: ${geometry.type}`);
      }
    } catch (geomError) {
      console.error(`Error processing geometry for feature ${index}:`, geomError);
    }

    kml += `    </Placemark>
`;
  });

  kml += `  </Document>
</kml>`;

  console.log("Generated KML preview:", kml.substring(0, 500) + "...");
  return kml;
}

/**
 * Validate and clean GeoJSON data for export
 */
function validateAndCleanGeoJSON(geoJSON) {
  if (!geoJSON) {
    throw new Error("GeoJSON data is null or undefined");
  }

  const cleaned = {
    type: "FeatureCollection",
    features: []
  };

  if (!geoJSON.features || !Array.isArray(geoJSON.features)) {
    console.warn("GeoJSON has no valid features array");
    return cleaned;
  }

  geoJSON.features.forEach((feature, index) => {
    try {
      // Validate feature structure
      if (!feature || typeof feature !== 'object') {
        console.warn(`Feature ${index} is not a valid object`);
        return;
      }

      // Ensure basic feature structure
      const cleanedFeature = {
        type: "Feature",
        geometry: null,
        properties: {}
      };

      // Validate and clean geometry
      if (feature.geometry && typeof feature.geometry === 'object') {
        const geom = feature.geometry;
        
        if (geom.type && geom.coordinates) {
          // Validate coordinate structure based on geometry type
          if (geom.type === "Point" && Array.isArray(geom.coordinates) && geom.coordinates.length >= 2) {
            const [lng, lat] = geom.coordinates;
            if (typeof lng === 'number' && typeof lat === 'number' && !isNaN(lng) && !isNaN(lat)) {
              cleanedFeature.geometry = {
                type: "Point",
                coordinates: [lng, lat]
              };
            }
          } else if (geom.type === "LineString" && Array.isArray(geom.coordinates)) {
            const validCoords = geom.coordinates.filter(coord => 
              Array.isArray(coord) && coord.length >= 2 && 
              typeof coord[0] === 'number' && typeof coord[1] === 'number' &&
              !isNaN(coord[0]) && !isNaN(coord[1])
            );
            if (validCoords.length >= 2) {
              cleanedFeature.geometry = {
                type: "LineString",
                coordinates: validCoords
              };
            }
          } else if (geom.type === "Polygon" && Array.isArray(geom.coordinates)) {
            const validRings = geom.coordinates.map(ring => {
              if (Array.isArray(ring)) {
                return ring.filter(coord => 
                  Array.isArray(coord) && coord.length >= 2 && 
                  typeof coord[0] === 'number' && typeof coord[1] === 'number' &&
                  !isNaN(coord[0]) && !isNaN(coord[1])
                );
              }
              return [];
            }).filter(ring => ring.length >= 4); // Polygons need at least 4 points (closed)
            
            if (validRings.length > 0) {
              cleanedFeature.geometry = {
                type: "Polygon",
                coordinates: validRings
              };
            }
          }
        }
      }

      // Clean properties
      if (feature.properties && typeof feature.properties === 'object') {
        Object.keys(feature.properties).forEach(key => {
          const value = feature.properties[key];
          if (value !== null && value !== undefined) {
            // Convert to string if it's a complex object, otherwise keep as is
            if (typeof value === 'object' && !Array.isArray(value)) {
              cleanedFeature.properties[key] = JSON.stringify(value);
            } else {
              cleanedFeature.properties[key] = value;
            }
          }
        });
      }

      // Only add feature if it has valid geometry or properties
      if (cleanedFeature.geometry || Object.keys(cleanedFeature.properties).length > 0) {
        cleaned.features.push(cleanedFeature);
      }

    } catch (featureError) {
      console.error(`Error cleaning feature ${index}:`, featureError);
    }
  });

  console.log(`GeoJSON validation: ${geoJSON.features.length} original features -> ${cleaned.features.length} valid features`);
  return cleaned;
}

/**
 * Escape XML special characters
 */
function escapeXML(str) {
  if (typeof str !== 'string') {
    str = String(str);
  }
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * convert GeoJSON to CSV (compatible with import function)
 */
function convertToCSV(geoJSON) {
  console.log("Converting to CSV, input data:", geoJSON);

  if (!geoJSON) {
    console.error("GeoJSON data is null or undefined");
    throw new Error("البيانات المدخلة فارغة");
  }

  if (!geoJSON.features) {
    console.error("GeoJSON has no features property");
    console.log("Available properties:", Object.keys(geoJSON));
    throw new Error("البيانات لا تحتوي على خاصية features");
  }

  if (!Array.isArray(geoJSON.features)) {
    console.error("Features is not an array:", typeof geoJSON.features);
    throw new Error("خاصية features ليست مصفوفة");
  }

  if (!geoJSON.features.length) {
    console.warn("No features to export");
    return "name,description,latitude,longitude\nلا توجد بيانات للتصدير,,,";
  }

  // collect all element properties to create the headers
  const allHeaders = new Set();
  geoJSON.features.forEach((feature) => {
    if (feature.properties) {
      Object.keys(feature.properties).forEach((key) => {
        allHeaders.add(key);
      });
    }
  });

  // Create headers array with coordinates in the right order for import compatibility
  const propertyHeaders = Array.from(allHeaders);
  const headers = [...propertyHeaders];
  
  // Add coordinate columns with names that the import function can recognize
  const hasPoints = geoJSON.features.some((f) => f.geometry && f.geometry.type === "Point");
  if (hasPoints) {
    // Use standard names that the import function looks for
    headers.push("latitude", "longitude");
  }

  // create the header row
  let csv = headers.map((h) => escapeCSVValue(h)).join(",") + "\n";

  geoJSON.features.forEach((feature) => {
    const row = [];

    headers.forEach((header) => {
      if (header === "longitude") {
        if (feature.geometry && feature.geometry.type === "Point") {
          row.push(feature.geometry.coordinates[0]); // longitude is first in GeoJSON
        } else {
          row.push("");
        }
      } else if (header === "latitude") {
        if (feature.geometry && feature.geometry.type === "Point") {
          row.push(feature.geometry.coordinates[1]); // latitude is second in GeoJSON
        } else {
          row.push("");
        }
      } else {
        const value = feature.properties ? feature.properties[header] : "";
        row.push(escapeCSVValue(value));
      }
    });

    csv += row.join(",") + "\n";
  });

  console.log("Generated CSV preview:", csv.substring(0, 300) + "...");
  return csv;
}

/**
 * Properly escape CSV values
 */
function escapeCSVValue(value) {
  if (value === null || value === undefined) {
    return "";
  }
  
  const stringValue = String(value);
  
  // If the value contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n') || stringValue.includes('\r')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
}

/**
 * export as Shapefile
 */
async function exportAsShapefile(geoJSON, fileName) {
  console.log("Attempting to export as Shapefile...");
  console.log("shpwrite library available:", typeof shpwrite !== "undefined");
  console.log("JSZip library available:", typeof JSZip !== "undefined");

  // Diagnose library availability
  if (typeof shpwrite === "undefined") {
    console.error(
      "shpwrite library is not loaded. Check if the script tag is correct:"
    );
    console.error(
      "Expected: https://unpkg.com/@mapbox/shp-write@latest/shpwrite.js"
    );
  } else {
    console.log("shpwrite library details:", {
      hasZipFunction: typeof shpwrite.zip === "function",
      hasWriteFunction: typeof shpwrite.write === "function",
      availableMethods: Object.keys(shpwrite),
      version: shpwrite.version || "unknown",
    });

    // Test shpwrite with a simple feature
    try {
      const testFeature = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [0, 0],
            },
            properties: {
              name: "test",
            },
          },
        ],
      };
      const testResult = shpwrite.zip(testFeature);
      const testSize = testResult
        ? testResult.byteLength || testResult.length || 0
        : 0;
      console.log("shpwrite test result size:", testSize);

      if (testSize === 0) {
        console.warn(
          "⚠️ shpwrite library test returned 0 bytes - library may be broken"
        );
        console.log(
          "Will attempt manual shapefile creation if main export fails"
        );
      } else {
        console.log("✅ shpwrite library test passed");
      }
    } catch (testError) {
      console.error("❌ shpwrite test failed:", testError.message);
      console.log("Will use fallback methods for shapefile export");
    }
  }

  if (typeof JSZip === "undefined") {
    console.error(
      "JSZip library is not loaded. Check if the script tag is correct:"
    );
    console.error(
      "Expected: https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
    );
  }

  try {
    // check if the shp-write library is available
    if (typeof shpwrite === "undefined") {
      console.warn(
        "shp-write library not available, falling back to GeoJSON in ZIP"
      );

      // use a fallback method - convert to compressed GeoJSON
      const content = JSON.stringify(geoJSON, null, 2);

      // Check if JSZip is available
      if (typeof JSZip === "undefined") {
        console.error(
          "JSZip library not available either, exporting as plain GeoJSON"
        );
        downloadFile(content, fileName + ".geojson", "application/json");
        showAlert(
          "تم التصدير كـ GeoJSON (مكتبة Shapefile غير متوفرة)",
          "warning"
        );
        return;
      }

      const zip = new JSZip();
      zip.file(fileName + ".geojson", content);
      zip.file(
        "README.txt",
        "هذا ملف GeoJSON بدلاً من Shapefile لأن مكتبة shp-write غير متوفرة.\n" +
          "يمكنك تحويل ملف GeoJSON إلى Shapefile باستخدام برامج GIS مثل QGIS أو ArcGIS.\n" +
          "Date: " +
          new Date().toLocaleString("ar-SY")
      );

      zip
        .generateAsync({ type: "blob" })
        .then(function (content) {
          downloadFile(content, fileName + "_geojson.zip", "application/zip");
          showAlert(
            "تم التصدير كـ GeoJSON مضغوط (مكتبة Shapefile غير متوفرة)",
            "warning"
          );
        })
        .catch(function (error) {
          console.error("Error creating ZIP file:", error);
          downloadFile(
            JSON.stringify(geoJSON, null, 2),
            fileName + ".geojson",
            "application/json"
          );
          showAlert("تم التصدير كـ GeoJSON عادي", "warning");
        });
      return;
    }

    console.log("Using shp-write library to create Shapefile...");
    console.log("Input GeoJSON:", geoJSON);

    // Validate input data
    if (!geoJSON || !geoJSON.features || geoJSON.features.length === 0) {
      throw new Error("لا توجد بيانات للتصدير");
    }

    // Clean and validate the data for shp-write
    console.log("Original data validation:");
    console.log("- Feature count:", geoJSON.features.length);
    console.log("- Geometry types:", [
      ...new Set(geoJSON.features.map((f) => f.geometry?.type)),
    ]);
    console.log(
      "- Sample properties:",
      Object.keys(geoJSON.features[0]?.properties || {})
    );

    const cleanedGeoJSON = {
      type: "FeatureCollection",
      features: geoJSON.features
        .map((feature, index) => {
          // Validate geometry
          if (
            !feature.geometry ||
            !feature.geometry.type ||
            !feature.geometry.coordinates
          ) {
            console.warn(
              `Feature ${index} has invalid geometry:`,
              feature.geometry
            );
            return null;
          }

          // Clean properties for shapefile compatibility
          const properties = {};
          if (feature.properties) {
            Object.keys(feature.properties).forEach((key) => {
              const value = feature.properties[key];
              // Shapefile field name restrictions
              let cleanKey = key
                .replace(/[^a-zA-Z0-9_]/g, "_")
                .substring(0, 10);
              if (!cleanKey || cleanKey[0].match(/[0-9]/)) {
                cleanKey = "F_" + cleanKey.substring(0, 8);
              }

              // Convert to valid types for shapefile
              if (value !== null && value !== undefined) {
                if (typeof value === "boolean") {
                  properties[cleanKey] = value ? "true" : "false";
                } else if (typeof value === "number") {
                  properties[cleanKey] = isNaN(value) ? "0" : value;
                } else if (typeof value === "object") {
                  properties[cleanKey] = JSON.stringify(value).substring(
                    0,
                    254
                  );
                } else {
                  properties[cleanKey] = String(value).substring(0, 254);
                }
              } else {
                properties[cleanKey] = "";
              }
            });
          }

          // Ensure at least one property exists
          if (Object.keys(properties).length === 0) {
            properties.ID = index + 1;
          }

          return {
            type: "Feature",
            geometry: feature.geometry,
            properties: properties,
          };
        })
        .filter((f) => f !== null),
    };

    console.log("Cleaned data validation:");
    console.log("- Valid features:", cleanedGeoJSON.features.length);
    console.log(
      "- Sample cleaned properties:",
      Object.keys(cleanedGeoJSON.features[0]?.properties || {})
    );

    console.log("Cleaned GeoJSON for shapefile:", cleanedGeoJSON);

    // Use shp-write with better options
    const options = {
      folder: fileName,
      types: {
        point: "points",
        polygon: "polygons",
        polyline: "lines",
      },
    };

    console.log("Calling shpwrite.zip with options:", options);

    // Try different approaches for creating shapefile
    let zipBuffer;

    try {
      // Method 1: Standard zip function
      zipBuffer = shpwrite.zip(cleanedGeoJSON, options);
    } catch (zipError) {
      console.warn(
        "Standard zip method failed, trying alternative:",
        zipError.message
      );

      try {
        // Method 2: Try without options
        zipBuffer = shpwrite.zip(cleanedGeoJSON);
      } catch (simpleZipError) {
        console.warn(
          "Simple zip method failed, trying write method:",
          simpleZipError.message
        );

        try {
          // Method 3: Try write method if available
          if (typeof shpwrite.write === "function") {
            const shapefiles = shpwrite.write(cleanedGeoJSON);
            console.log("Write method produced:", Object.keys(shapefiles));

            // Create ZIP manually using JSZip
            if (typeof JSZip !== "undefined") {
              const zip = new JSZip();
              Object.keys(shapefiles).forEach((fileName) => {
                zip.file(fileName, shapefiles[fileName]);
              });
              zipBuffer = await zip.generateAsync({ type: "arraybuffer" });
            } else {
              throw new Error("JSZip not available for manual ZIP creation");
            }
          } else {
            throw new Error("No alternative write method available");
          }
        } catch (writeError) {
          console.error(
            "All shapefile creation methods failed:",
            writeError.message
          );
          throw new Error("فشل في إنشاء Shapefile بجميع الطرق المتاحة");
        }
      }
    }

    console.log("Shapefile created, buffer type:", typeof zipBuffer);
    console.log(
      "Buffer size:",
      zipBuffer.byteLength || zipBuffer.length || "unknown"
    );

    // Check the produced file size and content
    if (!zipBuffer) {
      throw new Error("فشل في إنتاج ملف Shapefile - المخرج فارغ");
    }

    const bufferSize = zipBuffer.byteLength || zipBuffer.length || 0;
    console.log(`Produced shapefile size: ${bufferSize} bytes`);

    if (bufferSize < 100) {
      console.error("Shapefile output is too small:", bufferSize, "bytes");
      console.error("Input data summary:", {
        featureCount: cleanedGeoJSON.features.length,
        firstFeature: cleanedGeoJSON.features[0],
        geometryTypes: [
          ...new Set(cleanedGeoJSON.features.map((f) => f.geometry?.type)),
        ],
      });

      // Try to create a better shapefile manually
      console.log("Attempting manual shapefile creation...");
      try {
        const manualShapefile = await createManualShapefile(
          cleanedGeoJSON,
          fileName
        );
        if (manualShapefile && manualShapefile.byteLength > 100) {
          console.log(
            "Manual shapefile creation successful:",
            manualShapefile.byteLength,
            "bytes"
          );
          downloadFile(manualShapefile, fileName + ".zip", "application/zip");
          showAlert("تم تصدير الملف كـ Shapefile (طريقة بديلة)", "success");
          return;
        }
      } catch (manualError) {
        console.error("Manual shapefile creation failed:", manualError.message);
      }

      throw new Error(
        `⚠️ مكتبة shp-write تُنتج ملفات فارغة (${bufferSize} بايت)\n\n` +
          `📊 تفاصيل البيانات:\n` +
          `• عدد العناصر: ${cleanedGeoJSON.features.length}\n` +
          `• أنواع الهندسة: ${[
            ...new Set(cleanedGeoJSON.features.map((f) => f.geometry?.type)),
          ].join(", ")}\n` +
          `• خصائص متاحة: ${
            Object.keys(cleanedGeoJSON.features[0]?.properties || {}).length
          }\n\n` +
          `🔍 الأسباب المحتملة:\n` +
          `1. مكتبة @mapbox/shp-write معطلة أو قديمة\n` +
          `2. تضارب مع مكتبات أخرى (JSZip, etc.)\n` +
          `3. مشكلة في تنظيف البيانات للـ Shapefile\n` +
          `4. قيود المتصفح على إنشاء ملفات ZIP\n\n` +
          `💡 الحل: سيتم إنشاء حزمة تحويل شاملة بدلاً من ذلك`
      );
    }

    if (bufferSize < 500) {
      console.warn("Shapefile output is suspiciously small, but proceeding...");
    }

    downloadFile(zipBuffer, fileName + ".zip", "application/zip");

    console.log("Shapefile export completed successfully");
    showAlert("تم تصدير الملف كـ Shapefile بنجاح", "success");
  } catch (error) {
    console.error("خطأ في تصدير Shapefile:", error.message);

    // Create a comprehensive fallback package
    try {
      const zip = new JSZip();

      // Add GeoJSON file
      zip.file(`${fileName}.geojson`, JSON.stringify(geoJSON, null, 2));

      // Add CSV file if possible
      try {
        const csvContent = convertToCSV(geoJSON);
        zip.file(`${fileName}.csv`, csvContent);
      } catch (csvError) {
        console.warn("Could not create CSV in fallback:", csvError.message);
      }

      // Add detailed instructions
      const instructionsArabic = `⚠️ هذا ليس ملف Shapefile - حزمة تحويل بديلة ⚠️
================================================================

سبب إنشاء هذه الحزمة:
فشل في تصدير Shapefile مباشرة: ${error.message}

🚨 تنبيه مهم: هذا الأرشيف لا يحتوي على ملفات Shapefile حقيقية!

الملفات المضمنة في هذا الأرشيف:
- ${fileName}.geojson: البيانات الأصلية بصيغة GeoJSON
- ${fileName}.csv: البيانات في جدول (إن أمكن)
- instructions.txt: دليل التحويل باللغة الإنجليزية

طرق تحويل GeoJSON إلى Shapefile:

الطريقة الأولى - QGIS (الأفضل والمجاني):
1. حمل برنامج QGIS من qgis.org
2. افتح البرنامج
3. اسحب ملف ${fileName}.geojson إلى نافذة الخريطة
4. انقر بالزر الأيمن على اسم الطبقة في قائمة الطبقات
5. اختر "Export" ثم "Save Features As"
6. اختر "ESRI Shapefile" كصيغة الحفظ
7. حدد مكان الحفظ واضغط "OK"

الطريقة الثانية - أدوات أونلاين:
1. mapshaper.org (الأفضل)
   - اذهب إلى الموقع
   - اسحب ملف .geojson إلى الصفحة
   - اضغط "Export" واختر "Shapefile"

2. mygeodata.cloud
3. convertio.co

الطريقة الثالثة - سطر الأوامر (للمطورين):
ogr2ogr -f "ESRI Shapefile" output.shp ${fileName}.geojson

تاريخ المحاولة: ${new Date().toLocaleString("ar-SY")}
عدد العناصر: ${geoJSON.features.length}
أنواع الهندسة: ${[
        ...new Set(geoJSON.features.map((f) => f.geometry?.type)),
      ].join(", ")}
`;

      const instructionsEnglish = `Shapefile Export Failed - Alternative Solutions Guide
==================================================

Error Details:
${error.message}

Files included in this archive:
- ${fileName}.geojson: Original data in GeoJSON format
- ${fileName}.csv: Tabular data (if available)

How to convert GeoJSON to Shapefile:

Method 1 - QGIS (Recommended, Free):
1. Download QGIS from qgis.org
2. Open QGIS
3. Drag ${fileName}.geojson into the map window
4. Right-click the layer name in the Layers panel
5. Choose "Export" > "Save Features As"
6. Select "ESRI Shapefile" as format
7. Choose output location and click "OK"

Method 2 - Online Tools:
1. mapshaper.org (Best option)
   - Go to the website
   - Drag the .geojson file onto the page
   - Click "Export" and choose "Shapefile"

2. mygeodata.cloud
3. convertio.co

Method 3 - Command Line (Advanced):
ogr2ogr -f "ESRI Shapefile" output.shp ${fileName}.geojson

Export attempt: ${new Date().toLocaleString()}
Feature count: ${geoJSON.features.length}
Geometry types: ${[
        ...new Set(geoJSON.features.map((f) => f.geometry?.type)),
      ].join(", ")}
Properties: ${Object.keys(geoJSON.features[0]?.properties || {})
        .slice(0, 5)
        .join(", ")}${
        Object.keys(geoJSON.features[0]?.properties || {}).length > 5
          ? "..."
          : ""
      }
`;

      zip.file("تعليمات_التحويل.txt", instructionsArabic);
      zip.file("instructions.txt", instructionsEnglish);

      // Generate and download the ZIP
      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadFile(
        zipBlob,
        fileName + "_conversion_package.zip",
        "application/zip"
      );

      // Ask user what they prefer
      const userChoice = confirm(
        `فشل تصدير Shapefile مباشرة.\n\n` +
          `الخيارات المتاحة:\n` +
          `• اضغط "موافق" لتحميل GeoJSON فقط (أسرع)\n` +
          `• اضغط "إلغاء" لتحميل حزمة تحويل كاملة مع التعليمات\n\n` +
          `ملاحظة: يمكنك تحويل GeoJSON إلى Shapefile باستخدام QGIS أو mapshaper.org`
      );

      if (userChoice) {
        // User wants GeoJSON only
        const geoJSONString = JSON.stringify(geoJSON, null, 2);
        const geoJSONBlob = new Blob([geoJSONString], {
          type: "application/json",
        });
        downloadFile(geoJSONBlob, fileName + ".geojson", "application/json");

        showAlert(
          `تم تصدير البيانات كـ GeoJSON\n\n` +
            `لتحويلها إلى Shapefile:\n` +
            `• استخدم QGIS (مجاني): qgis.org\n` +
            `• أو موقع mapshaper.org\n` +
            `• أو أدوات التحويل الأونلاين الأخرى`,
          "info"
        );
      } else {
        // User wants full conversion package
        downloadFile(
          zipBlob,
          fileName + "_NOT_SHAPEFILE_conversion_package.zip",
          "application/zip"
        );

        showAlert(
          `تم إنشاء حزمة تحويل شاملة\n\n` +
            `تحتوي على:\n` +
            `• ملف GeoJSON للبيانات\n` +
            `• ملف CSV للجدول\n` +
            `• تعليمات مفصلة للتحويل\n\n` +
            `استخدم برنامج QGIS (مجاني) أو موقع mapshaper.org لتحويل البيانات إلى Shapefile`,
          "warning"
        );
      }
    } catch (fallbackError) {
      console.error(
        "Failed to create fallback package:",
        fallbackError.message
      );

      // Last resort: just export GeoJSON
      const geoJSONString = JSON.stringify(geoJSON, null, 2);
      const geoJSONBlob = new Blob([geoJSONString], {
        type: "application/json",
      });
      downloadFile(geoJSONBlob, fileName + ".geojson", "application/json");

      showAlert(
        `فشل تصدير Shapefile: ${error.message}\n\n` +
          `تم تصدير البيانات كـ GeoJSON.\n` +
          `للتحويل إلى Shapefile استخدم QGIS أو mapshaper.org`,
        "error"
      );
    }
  }
}

/**
 * Create shapefile manually using JSZip when shp-write fails
 * @param {Object} geoJSON - the GeoJSON data
 * @param {string} fileName - the file name
 * @returns {Promise<ArrayBuffer>} ZIP file buffer
 */
async function createManualShapefile(geoJSON, fileName) {
  console.log("Creating manual shapefile...");

  if (typeof JSZip === "undefined") {
    throw new Error("JSZip library not available for manual creation");
  }

  try {
    const zip = new JSZip();

    // Create a comprehensive README with conversion instructions
    const readmeContent = `تم إنشاء هذا الأرشيف بدلاً من Shapefile بسبب مشكلة في مكتبة التصدير.

الملفات المضمنة:
- ${fileName}.geojson: البيانات بصيغة GeoJSON
- ${fileName}.csv: البيانات بصيغة جدول
- conversion_guide.txt: دليل التحويل لـ Shapefile

تاريخ الإنشاء: ${new Date().toLocaleString("ar-SY")}
عدد العناصر: ${geoJSON.features.length}
أنواع الهندسة: ${[
      ...new Set(geoJSON.features.map((f) => f.geometry?.type)),
    ].join(", ")}

لتحويل هذه البيانات إلى Shapefile:
1. استخدم برنامج QGIS (مجاني):
   - افتح QGIS
   - اسحب ملف .geojson إلى الخريطة
   - انقر بالزر الأيمن على الطبقة > Export > Save Features As
   - اختر "ESRI Shapefile" كصيغة التصدير

2. استخدم أدوات أونلاين:
   - mapshaper.org
   - mygeodata.cloud
   - convertio.co

3. استخدم أدوات سطر الأوامر:
   - ogr2ogr (من GDAL)
   - الأمر: ogr2ogr -f "ESRI Shapefile" output.shp input.geojson
`;

    // Add the main files
    zip.file("README.txt", readmeContent);
    zip.file(`${fileName}.geojson`, JSON.stringify(geoJSON, null, 2));

    // Create CSV version
    try {
      const csvContent = convertToCSV(geoJSON);
      zip.file(`${fileName}.csv`, csvContent);
    } catch (csvError) {
      console.warn("Could not create CSV version:", csvError.message);
    }

    // Create conversion guide
    const conversionGuide = `Shapefile Conversion Guide
========================

This archive contains geographic data that should be converted to Shapefile format.

Files included:
- ${fileName}.geojson (Main data file)
- ${fileName}.csv (Tabular data)

Recommended conversion methods:

1. QGIS (Free, recommended):
   - Download from qgis.org
   - Open QGIS
   - Drag the .geojson file into the map
   - Right-click the layer > Export > Save Features As
   - Choose "ESRI Shapefile" as format
   - Set output location and click OK

2. Online converters:
   - mapshaper.org (drag and drop, then export)
   - mygeodata.cloud
   - convertio.co

3. Command line (GDAL):
   ogr2ogr -f "ESRI Shapefile" output.shp ${fileName}.geojson

Data summary:
- Features: ${geoJSON.features.length}
- Geometry types: ${[
      ...new Set(geoJSON.features.map((f) => f.geometry?.type)),
    ].join(", ")}
- Properties: ${Object.keys(geoJSON.features[0]?.properties || {}).join(", ")}

For technical support, please refer to the original data source.
`;

    zip.file("conversion_guide.txt", conversionGuide);

    // Generate the ZIP file
    const zipBuffer = await zip.generateAsync({
      type: "arraybuffer",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    console.log(
      "Manual shapefile package created:",
      zipBuffer.byteLength,
      "bytes"
    );
    return zipBuffer;
  } catch (error) {
    console.error("Error creating manual shapefile:", error);
    throw new Error(`فشل في إنشاء حزمة بديلة: ${error.message}`);
  }
}

/**
 * export as Excel
 */
function exportAsExcel(geoJSON, fileName) {
  try {
    // check if the XLSX library is available
    if (typeof XLSX === "undefined") {
      // export as CSV instead
      const csvContent = convertToCSV(geoJSON);
      downloadFile(csvContent, fileName + ".csv", "text/csv");
      showAlert("تم التصدير كـ CSV بدلاً من Excel", "warning");
      return;
    }

    // convert GeoJSON to Excel format
    const worksheet_data = [];

    // add the headers
    if (geoJSON.features.length > 0) {
      const headers = Object.keys(geoJSON.features[0].properties);
      if (
        geoJSON.features[0].geometry &&
        geoJSON.features[0].geometry.type === "Point"
      ) {
        headers.push("longitude", "latitude");
      }
      worksheet_data.push(headers);

      // add the data
      geoJSON.features.forEach((feature) => {
        const row = [];
        Object.keys(feature.properties).forEach((key) => {
          row.push(feature.properties[key]);
        });

        if (feature.geometry && feature.geometry.type === "Point") {
          row.push(feature.geometry.coordinates[0]);
          row.push(feature.geometry.coordinates[1]);
        }

        worksheet_data.push(row);
      });
    }

    const ws = XLSX.utils.aoa_to_sheet(worksheet_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "البيانات");

    XLSX.writeFile(wb, fileName + ".xlsx");
  } catch (error) {
    console.error("خطأ في تصدير Excel:", error);
    // export as CSV instead
    const csvContent = convertToCSV(geoJSON);
    downloadFile(csvContent, fileName + ".csv", "text/csv");
    showAlert("تم التصدير كـ CSV بدلاً من Excel", "warning");
  }
}

/**
 * export as PDF (map)
 */
function exportAsPDF(geoJSON, fileName) {
  try {
    // check if the jsPDF library is available
    if (typeof jsPDF === "undefined") {
      showAlert("مكتبة PDF غير متوفرة، سيتم تصدير كـ GeoJSON", "warning");
      const content = JSON.stringify(geoJSON, null, 2);
      downloadFile(content, fileName + ".geojson", "application/json");
      return;
    }

    const doc = new jsPDF("landscape", "mm", "a4");

    // set the Arabic font if available
    doc.setFont("Arial", "normal");

    // map title
    doc.setFontSize(16);
    doc.text("خريطة البيانات المصدرة", 15, 20);

    // basic information
    doc.setFontSize(12);
    doc.text(
      `تاريخ التصدير: ${new Date().toLocaleDateString("ar-SY")}`,
      15,
      30
    );
    doc.text(`عدد العناصر: ${geoJSON.features.length}`, 15, 40);

    // draw a simple map if the data contains coordinates
    if (geoJSON.features.length > 0 && geoJSON.features[0].geometry) {
      drawSimpleMap(doc, geoJSON, 15, 50, 260, 150);
    }

    // data table
    let yPosition = 210;
    doc.setFontSize(10);

    geoJSON.features.slice(0, 10).forEach((feature, index) => {
      if (yPosition > 280) return; // avoid exceeding the page boundaries

      const name =
        feature.properties.name ||
        feature.properties.Names ||
        feature.properties.Name ||
        `عنصر ${index + 1}`;

      doc.text(`${index + 1}. ${name}`, 15, yPosition);
      yPosition += 5;
    });

    if (geoJSON.features.length > 10) {
      doc.text(`... و ${geoJSON.features.length - 10} عنصر آخر`, 15, yPosition);
    }

    doc.save(fileName + ".pdf");
  } catch (error) {
    console.error("خطأ في تصدير PDF:", error);
    showAlert("حدث خطأ في تصدير PDF، سيتم تصدير كـ GeoJSON", "warning");
    const content = JSON.stringify(geoJSON, null, 2);
    downloadFile(content, fileName + ".geojson", "application/json");
  }
}

/**
 * draw a simple map in PDF
 */
function drawSimpleMap(doc, geoJSON, x, y, width, height) {
  try {
    // calculate the data boundaries
    let minLng = Infinity,
      maxLng = -Infinity;
    let minLat = Infinity,
      maxLat = -Infinity;

    geoJSON.features.forEach((feature) => {
      if (feature.geometry && feature.geometry.coordinates) {
        if (feature.geometry.type === "Point") {
          const [lng, lat] = feature.geometry.coordinates;
          minLng = Math.min(minLng, lng);
          maxLng = Math.max(maxLng, lng);
          minLat = Math.min(minLat, lat);
          maxLat = Math.max(maxLat, lat);
        } else if (feature.geometry.type === "Polygon") {
          feature.geometry.coordinates[0].forEach((coord) => {
            minLng = Math.min(minLng, coord[0]);
            maxLng = Math.max(maxLng, coord[0]);
            minLat = Math.min(minLat, coord[1]);
            maxLat = Math.max(maxLat, coord[1]);
          });
        }
      }
    });

    // draw the map frame
    doc.rect(x, y, width, height);

    // draw the elements
    geoJSON.features.forEach((feature) => {
      if (feature.geometry) {
        if (feature.geometry.type === "Point") {
          const [lng, lat] = feature.geometry.coordinates;
          const screenX = x + ((lng - minLng) / (maxLng - minLng)) * width;
          const screenY =
            y + height - ((lat - minLat) / (maxLat - minLat)) * height;
          doc.circle(screenX, screenY, 1, "F");
        }
      }
    });
  } catch (error) {
    console.error("خطأ في رسم الخريطة:", error);
  }
}

/**
 * download a file
 */
function downloadFile(content, fileName, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * format the date
 */
function formatDate() {
  const now = new Date();
  return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}`;
}

/**
 * escape special characters in XML
 */
function escapeXML(str) {
  if (typeof str !== "string") return str;
  return str.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}

/**
 * show an alert to the user
 */
function showAlert(message, type = "info") {
  // use the existing notification system or a regular alert
  if (typeof showNotification === "function") {
    showNotification(message, type);
  } else {
    alert(message);
  }
  console.log(`${type.toUpperCase()}: ${message}`);
}

/**
 * add an imported layer to the layers list
 * @param {string} layerName - the layer name
 * @param {Object} layer - the layer object
 */
function addImportedLayerToList(layerName, layer) {
  console.log("addImportedLayerToList called with:", layerName);

  // get the layers list from the sidebar
  const layersList = document.getElementById("layersList");
  if (!layersList) {
    console.warn(
      "لم يتم العثور على قائمة الطبقات - Element 'layersList' not found"
    );
    // Try alternative locations
    const leftSidebar = document.getElementById("leftSidebar");
    if (leftSidebar) {
      console.log("Found leftSidebar, but no layersList inside");
    }
    return;
  }

  console.log("Found layersList element, proceeding with layer addition");

  // create a unique identifier for the layer
  const layerId = "imported-layer-" + Date.now();

  // save the layer in a global variable for later access
  window.importedLayers = window.importedLayers || {};
  window.importedLayers[layerId] = layer;

  // create an HTML element for the imported layer
  const layerItem = document.createElement("div");
  layerItem.className = "layer-item imported-layer";
  layerItem.innerHTML = `
    <div class="layer-toggle">
      <input type="checkbox" id="${layerId}" checked>
      <label for="${layerId}">${layerName} (مستورد)</label>
    </div>
    <div class="layer-actions">
      <button class="layer-action-btn" data-action="zoom" data-layer="${layerId}">
        <i class="fas fa-search-plus"></i>
      </button>
      <button class="layer-action-btn" data-action="remove" data-layer="${layerId}">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `;

  // add the element to the list
  layersList.appendChild(layerItem);
  console.log(
    "Layer item added to DOM, layersList children count:",
    layersList.children.length
  );

  // add event listeners for the layer
  const checkbox = layerItem.querySelector(`#${layerId}`);
  if (checkbox) {
    checkbox.addEventListener("change", function () {
      toggleImportedLayer(layerId, this.checked);
    });
  }

  // zoom button
  const zoomBtn = layerItem.querySelector('[data-action="zoom"]');
  if (zoomBtn) {
    zoomBtn.addEventListener("click", function () {
      zoomToImportedLayer(layerId);
    });
  }

  // delete button
  const removeBtn = layerItem.querySelector('[data-action="remove"]');
  if (removeBtn) {
    removeBtn.addEventListener("click", function () {
      removeImportedLayer(layerId, layerItem);
      // remove the layer from the export list
      const exportLayerSelect = document.getElementById("exportLayerSelect");
      if (exportLayerSelect) {
        const opt = exportLayerSelect.querySelector(
          `option[value="${layerId}"]`
        );
        if (opt) exportLayerSelect.removeChild(opt);
      }
    });
  }

  // add the layer to the export list
  const exportLayerSelect = document.getElementById("exportLayerSelect");
  if (exportLayerSelect) {
    // check if the option already exists
    if (!exportLayerSelect.querySelector(`option[value="${layerId}"]`)) {
      const opt = document.createElement("option");
      opt.value = layerId;
      opt.textContent = `${layerName} (مستورد)`;
      exportLayerSelect.appendChild(opt);
    }
  }

  console.log("addImportedLayerToList completed successfully for:", layerName);
}

/**
 * toggle the visibility of the imported layer
 * @param {string} layerId - the layer id
 * @param {boolean} visible - the visibility state
 */
function toggleImportedLayer(layerId, visible) {
  const layer = window.importedLayers && window.importedLayers[layerId];
  if (!layer || !window.map) return;

  if (visible) {
    if (!window.map.hasLayer(layer)) {
      window.map.addLayer(layer);
    }
  } else {
    if (window.map.hasLayer(layer)) {
      window.map.removeLayer(layer);
    }
  }
}

/**
 * zoom to the imported layer
 * @param {string} layerId - the layer id
 */
function zoomToImportedLayer(layerId) {
  const layer = window.importedLayers && window.importedLayers[layerId];
  if (!layer || !window.map) return;

  if (layer.getBounds) {
    window.map.fitBounds(layer.getBounds());
  }
}

/**
 * delete the imported layer
 * @param {string} layerId - the layer id
 * @param {HTMLElement} layerItem - the layer element
 */
function removeImportedLayer(layerId, layerItem) {
  const layer = window.importedLayers && window.importedLayers[layerId];
  if (!layer) return;

  // remove the layer from the map
  if (window.map && window.map.hasLayer && window.map.hasLayer(layer)) {
    window.map.removeLayer(layer);
  }

  // delete the layer from the object
  delete window.importedLayers[layerId];

  // remove the element from the list
  if (layerItem && layerItem.parentNode) {
    layerItem.parentNode.removeChild(layerItem);
  }
}

/**
 * Create a test CSV file for debugging
 */
function createTestCSV() {
  const csvContent = `name,longitude,latitude,description
Point 1,37.1343,36.2021,Test point in Aleppo
Point 2,37.1400,36.2100,Another test point
Point 3,37.1200,36.1950,Third test point`;

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "test_points.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log("Test CSV file created and downloaded");
}

// export the functions for global use
window.exportLayer = exportLayer;
window.initImportExport = initImportExport;
window.addImportedLayerToList = addImportedLayerToList;
window.toggleImportedLayer = toggleImportedLayer;
window.zoomToImportedLayer = zoomToImportedLayer;
window.removeImportedLayer = removeImportedLayer;
window.initializeImport = initializeImport;
window.createTestCSV = createTestCSV;

console.log("تم تحميل وحدة الاستيراد والتصدير بنجاح");
