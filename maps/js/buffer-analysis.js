/**
 * Buffer Analysis Module
 * Buffer Analysis
 *
 * Provides functions to create a circular buffer area and analyze its intersection with neighborhoods
 */

(function () {
  "use strict";

  // variables to save the analysis state
  let analysisCenter = null;
  let analysisRadius = 1;
  let bufferCircle = null;
  let isSelectingCenter = false;

  /**
   * initialize the buffer analysis functions
   */
  function initBufferAnalysis() {
    // check if the map is available
    if (!window.map) {
      console.error("الخريطة غير متوفرة");
      return;
    }

    // check if Turf.js is available
    if (typeof turf === "undefined") {
      console.error("مكتبة Turf.js غير متوفرة");
      return;
    }

    // bind the events
    bindEvents();

    // update the text according to the current language
    updateLanguage();
  }

  /**
   * update the text according to the current language
   */
  function updateLanguage() {
    const currentLang = document.documentElement.lang || "ar";
    const t =
      window.translations &&
      window.translations[currentLang] &&
      window.translations[currentLang].bufferAnalysis;

    if (!t) return;

    // update the titles
    const spatialAnalysisTitle = document.getElementById(
      "spatial-analysis-title"
    );
    if (spatialAnalysisTitle) spatialAnalysisTitle.textContent = t.sectionTitle;

    const bufferAnalysisTitle = document.getElementById(
      "buffer-analysis-title"
    );
    if (bufferAnalysisTitle) bufferAnalysisTitle.textContent = t.title;

    // update the labels
    const radiusLabel = document.getElementById("buffer-radius-label");
    if (radiusLabel) radiusLabel.textContent = t.radiusLabel;

    const selectCenterBtnText = document.getElementById(
      "select-center-btn-text"
    );
    if (selectCenterBtnText)
      selectCenterBtnText.textContent = t.selectCenterBtn;

    const runAnalysisBtnText = document.getElementById("run-analysis-btn-text");
    if (runAnalysisBtnText) runAnalysisBtnText.textContent = t.runAnalysisBtn;

    const cancelAnalysisBtnText = document.getElementById("cancel-analysis-btn-text");
    if (cancelAnalysisBtnText) cancelAnalysisBtnText.textContent = t.cancelAnalysisBtn;

    const reportModalTitle = document.getElementById("report-modal-title");
    if (reportModalTitle) reportModalTitle.textContent = t.reportTitle;
  }

  /**
   * bind the events to the elements
   */
  function bindEvents() {
    const selectCenterBtn = document.getElementById("select-center-btn");
    const runAnalysisBtn = document.getElementById("run-analysis-btn");
    const cancelAnalysisBtn = document.getElementById("cancel-analysis-btn");
    const closeButton = document.querySelector(".close-button");

    if (selectCenterBtn) {
      selectCenterBtn.addEventListener("click", function(e) {
        e.stopPropagation(); // Prevent event from bubbling up
        startCenterSelection();
      });
    }

    if (runAnalysisBtn) {
      runAnalysisBtn.addEventListener("click", runBufferAnalysis);
    }

    if (cancelAnalysisBtn) {
      cancelAnalysisBtn.addEventListener("click", cancelAnalysis);
    }

    if (closeButton) {
      closeButton.addEventListener("click", closeModal);
    }

    // close the modal when clicking outside it
    const modal = document.getElementById("report-modal");
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    // cancel center selection when clicking outside the map
    document.addEventListener("click", function (e) {
      if (isSelectingCenter) {
        const mapElement = document.getElementById("map");
        const selectCenterBtn = document.getElementById("select-center-btn");
        const rightSidebar = document.getElementById("rightSidebar");
        
        // Don't cancel if clicking on the select center button itself
        if (selectCenterBtn && selectCenterBtn.contains(e.target)) {
          return;
        }
        
        // Don't cancel if clicking inside the right sidebar (where the analysis controls are)
        if (rightSidebar && rightSidebar.contains(e.target)) {
          return;
        }
        
        if (mapElement && !mapElement.contains(e.target)) {
          cancelCenterSelection();
        }
      }
    });

    // cancel center selection when pressing Escape key
    document.addEventListener("keydown", function (e) {
      if (isSelectingCenter && e.key === "Escape") {
        cancelCenterSelection();
      }
    });
  }

  /**
   * start the center selection process
   */
  function startCenterSelection() {
    if (!window.map) return;
    
    // Prevent multiple simultaneous selections
    if (isSelectingCenter) return;

    console.log("Starting center selection...");
    
    isSelectingCenter = true;

    // change the cursor shape
    document.getElementById("map").style.cursor = "crosshair";

    // update the button text
    const selectBtn = document.getElementById("select-center-btn");
    const currentLang = document.documentElement.lang || "ar";
    const t =
      window.translations &&
      window.translations[currentLang] &&
      window.translations[currentLang].bufferAnalysis;

    if (selectBtn && t) {
      selectBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> <span>' +
        t.selectingCenterBtn +
        "</span>";
      selectBtn.style.background = "#ffc107";
      selectBtn.disabled = true;
    }

    // add click listeners to all layers and the map
    addClickListenersToLayers();
    
    // add a one-time click listener to the map
    window.map.once("click", onMapClick);

    // Show notification to user
    showNotification("تم تفعيل وضع تحديد المركز. انقر على أي مكان في الخريطة لتحديد المركز.", "info");
  }

  /**
   * add click listeners to all layers to allow clicking on them
   */
  function addClickListenersToLayers() {
    // Store original click handlers to restore them later
    window.originalLayerHandlers = {};

    // Add click listeners to neighborhoods layer
    if (window.neighborhoodsLayer) {
      window.neighborhoodsLayer.eachLayer(function(layer) {
        // Store original click handlers
        if (!window.originalLayerHandlers.neighborhoods) {
          window.originalLayerHandlers.neighborhoods = [];
        }
        
        // Get all current click handlers
        const originalClickHandlers = layer._events && layer._events.click ? 
          [...layer._events.click] : [];
        
        window.originalLayerHandlers.neighborhoods.push({
          layer: layer,
          originalClick: originalClickHandlers
        });
        
        // Remove original click handlers and add our own
        layer.off('click');
        layer.once("click", onMapClick);
      });
    }

    // Add click listeners to service sectors layer
    if (window.serviceSectorsLayer) {
      window.serviceSectorsLayer.eachLayer(function(layer) {
        // Store original click handlers
        if (!window.originalLayerHandlers.serviceSectors) {
          window.originalLayerHandlers.serviceSectors = [];
        }
        
        // Get all current click handlers
        const originalClickHandlers = layer._events && layer._events.click ? 
          [...layer._events.click] : [];
        
        window.originalLayerHandlers.serviceSectors.push({
          layer: layer,
          originalClick: originalClickHandlers
        });
        
        // Remove original click handlers and add our own
        layer.off('click');
        layer.once("click", onMapClick);
      });
    }

    // Add click listeners to service sectors GeoJSON layer
    if (window.serviceSectorsGeoJsonLayer) {
      window.serviceSectorsGeoJsonLayer.eachLayer(function(layer) {
        // Store original click handlers
        if (!window.originalLayerHandlers.serviceSectorsGeoJson) {
          window.originalLayerHandlers.serviceSectorsGeoJson = [];
        }
        
        // Get all current click handlers
        const originalClickHandlers = layer._events && layer._events.click ? 
          [...layer._events.click] : [];
        
        window.originalLayerHandlers.serviceSectorsGeoJson.push({
          layer: layer,
          originalClick: originalClickHandlers
        });
        
        // Remove original click handlers and add our own
        layer.off('click');
        layer.once("click", onMapClick);
      });
    }

    // Add click listeners to Aleppo city layer
    if (window.aleppoCityLayer) {
      window.aleppoCityLayer.eachLayer(function(layer) {
        // Store original click handlers
        if (!window.originalLayerHandlers.aleppoCity) {
          window.originalLayerHandlers.aleppoCity = [];
        }
        
        // Get all current click handlers
        const originalClickHandlers = layer._events && layer._events.click ? 
          [...layer._events.click] : [];
        
        window.originalLayerHandlers.aleppoCity.push({
          layer: layer,
          originalClick: originalClickHandlers
        });
        
        // Remove original click handlers and add our own
        layer.off('click');
        layer.once("click", onMapClick);
      });
    }

    // Add click listeners to neighborhood labels layer
    if (window.neighborhoodLabelsLayer) {
      window.neighborhoodLabelsLayer.eachLayer(function(layer) {
        // Store original click handlers
        if (!window.originalLayerHandlers.neighborhoodLabels) {
          window.originalLayerHandlers.neighborhoodLabels = [];
        }
        
        // Get all current click handlers
        const originalClickHandlers = layer._events && layer._events.click ? 
          [...layer._events.click] : [];
        
        window.originalLayerHandlers.neighborhoodLabels.push({
          layer: layer,
          originalClick: originalClickHandlers
        });
        
        // Remove original click handlers and add our own
        layer.off('click');
        layer.once("click", onMapClick);
      });
    }

    // Add click listeners to service sector labels layer
    if (window.serviceSectorLabelsLayer) {
      window.serviceSectorLabelsLayer.eachLayer(function(layer) {
        // Store original click handlers
        if (!window.originalLayerHandlers.serviceSectorLabels) {
          window.originalLayerHandlers.serviceSectorLabels = [];
        }
        
        // Get all current click handlers
        const originalClickHandlers = layer._events && layer._events.click ? 
          [...layer._events.click] : [];
        
        window.originalLayerHandlers.serviceSectorLabels.push({
          layer: layer,
          originalClick: originalClickHandlers
        });
        
        // Remove original click handlers and add our own
        layer.off('click');
        layer.once("click", onMapClick);
      });
    }

    // Add click listeners to main layers group
    if (window.mainLayersGroup) {
      window.mainLayersGroup.eachLayer(function(layer) {
        if (layer.eachLayer) {
          // If it's a layer group, add to each sub-layer
          layer.eachLayer(function(subLayer) {
            // Store original click handlers
            if (!window.originalLayerHandlers.mainLayersGroup) {
              window.originalLayerHandlers.mainLayersGroup = [];
            }
            
            // Get all current click handlers
            const originalClickHandlers = subLayer._events && subLayer._events.click ? 
              [...subLayer._events.click] : [];
            
            window.originalLayerHandlers.mainLayersGroup.push({
              layer: subLayer,
              originalClick: originalClickHandlers
            });
            
            // Remove original click handlers and add our own
            subLayer.off('click');
            subLayer.once("click", onMapClick);
          });
        } else {
          // If it's a single layer
          // Store original click handlers
          if (!window.originalLayerHandlers.mainLayersGroup) {
            window.originalLayerHandlers.mainLayersGroup = [];
          }
          
          // Get all current click handlers
          const originalClickHandlers = layer._events && layer._events.click ? 
            [...layer._events.click] : [];
          
          window.originalLayerHandlers.mainLayersGroup.push({
            layer: layer,
            originalClick: originalClickHandlers
          });
          
          // Remove original click handlers and add our own
          layer.off('click');
          layer.once("click", onMapClick);
        }
      });
    }
  }

  /**
   * handle the map click
   */
  function onMapClick(e) {
    if (!isSelectingCenter) return;

    // save the center location
    analysisCenter = e.latlng;

    // get the radius
    const radiusInput = document.getElementById("buffer-radius-km");
    analysisRadius = parseFloat(radiusInput.value) || 1;

    // remove the old circle if it exists
    if (bufferCircle) {
      window.map.removeLayer(bufferCircle);
    }

    // draw the new circle
    bufferCircle = L.circle(analysisCenter, {
      radius: analysisRadius * 1000, // convert from kilometers to meters
      color: "#dc3545",
      fillColor: "#dc3545",
      fillOpacity: 0.2,
      weight: 3,
    }).addTo(window.map);

    // reset the selection state
    isSelectingCenter = false;
    document.getElementById("map").style.cursor = "";

    // remove all click listeners from layers
    removeClickListenersFromLayers();

    // update the buttons
    updateButtons(true);

    // zoom the map to show the circle
    window.map.fitBounds(bufferCircle.getBounds(), { padding: [20, 20] });

    // Show success notification
    showNotification("تم تحديد المركز بنجاح! يمكنك الآن حساب تقرير النطاق.", "success");
  }

  /**
   * remove click listeners from all layers
   */
  function removeClickListenersFromLayers() {
    // Remove our click handlers from all layers
    if (window.originalLayerHandlers) {
      for (const key in window.originalLayerHandlers) {
        if (window.originalLayerHandlers.hasOwnProperty(key)) {
          window.originalLayerHandlers[key].forEach(handler => {
            // Remove our click handler
            handler.layer.off("click", onMapClick);
          });
        }
      }
      window.originalLayerHandlers = {}; // Clear handlers after removing
    }
    
    // Re-initialize original click handlers for all layers
    reinitializeOriginalLayerHandlers();
  }

  /**
   * re-initialize original click handlers for all layers
   */
  function reinitializeOriginalLayerHandlers() {
    // Re-initialize neighborhoods layer click handlers
    if (window.neighborhoodsLayer) {
      window.neighborhoodsLayer.eachLayer(function(layer) {
        // Remove any existing click handlers
        layer.off('click');
        
        // Re-create the popup if it doesn't exist
        const feature = layer.feature;
        if (feature && feature.properties) {
          if (typeof createNeighborhoodPopup === "function") {
            createNeighborhoodPopup(feature, layer);
          } else {
            // Fallback: create a simple popup if the function doesn't exist
            const popupContent = `
              <div style="text-align: center; padding: 10px;">
                <h4 style="margin: 0 0 10px 0; color: #333;">${feature.properties.Names || feature.properties.name || 'حي غير معروف'}</h4>
                <div style="font-size: 12px; color: #666;">
                  انقر للحصول على مزيد من المعلومات
                </div>
              </div>
            `;
            layer.bindPopup(popupContent);
          }
        }
        
        // Re-add the original click handler that shows popup and updates info panel
        layer.on("click", function () {
          const feature = layer.feature;
          if (feature && feature.properties) {
            // First, show the popup if it exists
            if (layer.getPopup) {
              layer.openPopup();
            } else {
              // If no popup exists, create a simple one
              const popupContent = `
                <div style="text-align: center; padding: 10px;">
                  <h4 style="margin: 0 0 10px 0; color: #333;">${feature.properties.Names || feature.properties.name || 'حي غير معروف'}</h4>
                  <div style="font-size: 12px; color: #666;">
                    انقر للحصول على مزيد من المعلومات
                  </div>
                </div>
              `;
              layer.bindPopup(popupContent);
              layer.openPopup();
            }
            
            // Update info panel title
            const infoTitle = document.getElementById("info-title");
            if (infoTitle) {
              infoTitle.textContent = feature.properties.Names || feature.properties.name || "غير معروف";
            }

            // Update info panel content
            if (typeof handleNeighborhoodSelect === "function") {
              handleNeighborhoodSelect(
                feature.properties.ID,
                feature.properties.Names || feature.properties.name
              );
            }
          }
        });

        // Re-add hover effects (only if setStyle is available)
        if (typeof layer.setStyle === 'function') {
          layer.on("mouseover", function () {
            this.setStyle({
              fillOpacity: 0.7,
              weight: 2,
            });
          });

          layer.on("mouseout", function () {
            this.setStyle({
              fillOpacity: 0.5,
              weight: 1,
            });
          });
        }
      });
    }

    // Re-initialize service sectors layer click handlers
    if (window.serviceSectorsLayer) {
      window.serviceSectorsLayer.eachLayer(function(layer) {
        // Remove any existing click handlers
        layer.off('click');
        
        // Re-add the original click handler that shows popup
        layer.on("click", function () {
          // The popup should already be bound, just trigger it
          if (layer.getPopup) {
            layer.openPopup();
          } else {
            // If popup is not bound, create a simple one
            const feature = layer.feature;
            if (feature && feature.properties) {
              const popupContent = `
                <div style="text-align: center; padding: 10px;">
                  <h4 style="margin: 0 0 10px 0; color: #333;">${feature.properties.Name || feature.properties.name || 'غير معروف'}</h4>
                  <div style="font-size: 12px; color: #666;">
                    انقر للحصول على مزيد من المعلومات
                  </div>
                </div>
              `;
              layer.bindPopup(popupContent);
              layer.openPopup();
            }
          }
        });

        // Re-add hover effects (only if setStyle is available)
        if (typeof layer.setStyle === 'function') {
          layer.on("mouseover", function () {
            this.setStyle({
              fillOpacity: 0.7,
              weight: 2,
            });
          });

          layer.on("mouseout", function () {
            this.setStyle({
              fillOpacity: 0.5,
              weight: 1,
            });
          });
        }
      });
    }

    // Re-initialize service sectors GeoJSON layer click handlers
    if (window.serviceSectorsGeoJsonLayer) {
      window.serviceSectorsGeoJsonLayer.eachLayer(function(layer) {
        // Remove any existing click handlers
        layer.off('click');
        
        // Re-add the original click handler that shows popup
        layer.on("click", function () {
          // The popup should already be bound, just trigger it
          if (layer.getPopup) {
            layer.openPopup();
          } else {
            // If popup is not bound, create a simple one
            const feature = layer.feature;
            if (feature && feature.properties) {
              const popupContent = `
                <div style="text-align: center; padding: 10px;">
                  <h4 style="margin: 0 0 10px 0; color: #333;">${feature.properties.Name || feature.properties.name || 'غير معروف'}</h4>
                  <div style="font-size: 12px; color: #666;">
                    انقر للحصول على مزيد من المعلومات
                  </div>
                </div>
              `;
              layer.bindPopup(popupContent);
              layer.openPopup();
            }
          }
        });

        // Re-add hover effects (only if setStyle is available)
        if (typeof layer.setStyle === 'function') {
          layer.on("mouseover", function () {
            this.setStyle({
              fillOpacity: 0.7,
              weight: 2,
            });
          });

          layer.on("mouseout", function () {
            this.setStyle({
              fillOpacity: 0.5,
              weight: 1,
            });
          });
        }
      });
    }

    // Re-initialize Aleppo city layer click handlers
    if (window.aleppoCityLayer) {
      window.aleppoCityLayer.eachLayer(function(layer) {
        // Remove any existing click handlers
        layer.off('click');
        
        // Re-add the original click handler
        layer.on("click", function () {
          console.log("Aleppo city clicked");
          // The popup should already be bound, just trigger it
          if (layer.getPopup) {
            layer.openPopup();
          } else {
            // If popup is not bound, create a simple one
            const feature = layer.feature;
            if (feature && feature.properties) {
              const popupContent = `
                <div style="text-align: center; padding: 10px;">
                  <h4 style="margin: 0 0 10px 0; color: #333;">${feature.properties.Name || feature.properties.name || 'مدينة حلب'}</h4>
                  <div style="font-size: 12px; color: #666;">
                    انقر للحصول على مزيد من المعلومات
                  </div>
                </div>
              `;
              layer.bindPopup(popupContent);
              layer.openPopup();
            }
          }
        });

        // Re-add hover effects (only if setStyle is available)
        if (typeof layer.setStyle === 'function') {
          layer.on("mouseover", function () {
            this.setStyle({
              fillOpacity: 0.4,
              weight: 4,
            });
          });

          layer.on("mouseout", function () {
            this.setStyle({
              fillOpacity: 0.2,
              weight: 3,
            });
          });
        }
      });
    }

    // Re-initialize neighborhood labels layer (if it has click handlers)
    if (window.neighborhoodLabelsLayer) {
      window.neighborhoodLabelsLayer.eachLayer(function(layer) {
        // Remove any existing click handlers
        layer.off('click');
        
        // Labels are markers, not polygons, so they don't have setStyle
        // Just add basic hover effects if the layer supports them
        if (typeof layer.setStyle === 'function') {
          layer.on("mouseover", function () {
            this.setStyle({
              fillOpacity: 0.7,
              weight: 2,
            });
          });

          layer.on("mouseout", function () {
            this.setStyle({
              fillOpacity: 0.5,
              weight: 1,
            });
          });
        }
      });
    }

    // Re-initialize service sector labels layer (if it has click handlers)
    if (window.serviceSectorLabelsLayer) {
      window.serviceSectorLabelsLayer.eachLayer(function(layer) {
        // Remove any existing click handlers
        layer.off('click');
        
        // Labels are markers, not polygons, so they don't have setStyle
        // Just add basic hover effects if the layer supports them
        if (typeof layer.setStyle === 'function') {
          layer.on("mouseover", function () {
            this.setStyle({
              fillOpacity: 0.7,
              weight: 2,
            });
          });

          layer.on("mouseout", function () {
            this.setStyle({
              fillOpacity: 0.5,
              weight: 1,
            });
          });
        }
      });
    }
  }

  /**
   * update the buttons state
   */
  function updateButtons(centerSelected) {
    const selectBtn = document.getElementById("select-center-btn");
    const runBtn = document.getElementById("run-analysis-btn");
    const currentLang = document.documentElement.lang || "ar";
    const t =
      window.translations &&
      window.translations[currentLang] &&
      window.translations[currentLang].bufferAnalysis;

    if (!t) return;

    if (selectBtn) {
      if (centerSelected) {
        selectBtn.innerHTML =
          '<i class="fas fa-check"></i> <span>' +
          t.centerSelectedBtn +
          "</span>";
        selectBtn.style.background = "#28a745";
        selectBtn.disabled = false;
      } else {
        selectBtn.innerHTML =
          '<i class="fas fa-crosshairs"></i> <span>' +
          t.selectCenterBtn +
          "</span>";
        selectBtn.style.background =
          "linear-gradient(135deg, #dc3545 0%, #c82333 100%)";
        selectBtn.disabled = false;
      }
    }

    if (runBtn) {
      const runBtnText = runBtn.querySelector("span") || runBtn;
      if (centerSelected) {
        runBtn.disabled = false;
        runBtn.style.background =
          "linear-gradient(135deg, #28a745 0%, #20c997 100%)";
        runBtn.style.cursor = "pointer";
        runBtn.style.opacity = "1";
        runBtnText.textContent = t.runAnalysisBtn;
      } else {
        runBtn.disabled = true;
        runBtn.style.background = "#6c757d";
        runBtn.style.cursor = "not-allowed";
        runBtn.style.opacity = "0.6";
        runBtnText.textContent = t.runAnalysisBtn;
      }
    }
  }

  /**
   * run the buffer analysis
   */
  function runBufferAnalysis() {
    if (!analysisCenter || !window.map) {
      const currentLang = document.documentElement.lang || "ar";
      const t =
        window.translations &&
        window.translations[currentLang] &&
        window.translations[currentLang].bufferAnalysis;
      showError(t ? t.selectCenterFirst : "يرجى تحديد المركز أولاً");
      return;
    }

    // check if the neighborhoods layer is available
    if (!window.neighborhoodsLayer) {
      const currentLang = document.documentElement.lang || "ar";
      const t =
        window.translations &&
        window.translations[currentLang] &&
        window.translations[currentLang].bufferAnalysis;
      showError(t ? t.layerNotAvailable : "طبقة الأحياء غير متوفرة");
      return;
    }

    // reset the neighborhoods styles
    resetNeighborhoodStyles();

    // create the circle using Turf.js
    const center = turf.point([analysisCenter.lng, analysisCenter.lat]);
    const bufferPolygon = turf.buffer(center, analysisRadius, {
      units: "kilometers",
    });

    // list of intersecting neighborhoods
    const intersectingNeighborhoods = [];

    console.log("بدء تحليل النطاق:", {
      center: [analysisCenter.lng, analysisCenter.lat],
      radius: analysisRadius,
      layerExists: !!window.neighborhoodsLayer,
    });

    // check each neighborhood
    window.neighborhoodsLayer.eachLayer(function (layer) {
      if (layer.feature && layer.feature.geometry) {
        try {
          // convert the layer to GeoJSON
          const neighborhoodGeoJSON = layer.feature;

          // check the intersection
          let intersection = null;

          try {
            intersection = turf.intersect(bufferPolygon, neighborhoodGeoJSON);
          } catch (intersectError) {
            // if turf.intersect fails, try an alternative method
            console.warn("turf.intersect failed, trying an alternative method");
            try {
              // check if the centroid of the polygon is inside the circle
              const centroid = turf.centroid(neighborhoodGeoJSON);
              const distance = turf.distance(center, centroid, {
                units: "kilometers",
              });
              if (distance <= analysisRadius) {
                intersection = centroid; // any value other than null
              }
            } catch (centroidError) {
              console.error("alternative check also failed:", centroidError);
            }
          }

          if (intersection) {
            // change the color of the intersecting neighborhood
            if (typeof layer.setStyle === 'function') {
              layer.setStyle({
                fillColor: "#dc3545",
                fillOpacity: 0.6,
                color: "#dc3545",
                weight: 3,
              });
            }

            // add the neighborhood name to the list
            const neighborhoodName =
              layer.feature.properties.Names ||
              layer.feature.properties.Name_En ||
              layer.feature.properties.name ||
              layer.feature.properties.Name ||
              layer.feature.properties.NAME ||
              "حي غير محدد";

            // print diagnostic information
            console.log("intersecting neighborhood found:", {
              name: neighborhoodName,
              properties: layer.feature.properties,
            });

            intersectingNeighborhoods.push(neighborhoodName);
          }
        } catch (error) {
          console.error("خطأ في فحص التقاطع:", error);
          console.error("خصائص الحي:", layer.feature.properties);
        }
      }
    });

    console.log("انتهاء التحليل:", {
      foundNeighborhoods: intersectingNeighborhoods.length,
      neighborhoods: intersectingNeighborhoods,
    });

    // remove the circle from the map after the analysis
    if (bufferCircle) {
      window.map.removeLayer(bufferCircle);
      bufferCircle = null;
    }

    // reset the center state to allow new analysis
    analysisCenter = null;

    // restore original click handlers to all layers
    removeClickListenersFromLayers();

    // update the buttons for new state
    updateButtons(false);

    // show success notification
    showNotification("تم حساب تقرير النطاق بنجاح! تم استعادة وظائف النقر الطبيعية على الخريطة. يمكنك الآن النقر على الأحياء ودوائر الخدمات ومدينة حلب لعرض المعلومات.", "success");

    // show the report
    showReport(intersectingNeighborhoods);
  }

  /**
   * reset the neighborhoods styles to the default state
   */
  function resetNeighborhoodStyles() {
    if (!window.neighborhoodsLayer) return;

    window.neighborhoodsLayer.eachLayer(function (layer) {
      if (typeof layer.setStyle === 'function') {
        layer.setStyle({
          fillColor: "#3388ff",
          fillOpacity: 0.2,
          color: "#3388ff",
          weight: 2,
        });
      }
    });
  }

  /**
   * show the report
   */
  function showReport(neighborhoods) {
    const modal = document.getElementById("report-modal");
    const resultsDiv = document.getElementById("report-results");

    if (!modal || !resultsDiv) return;

    const currentLang = document.documentElement.lang || "ar";
    const t =
      window.translations &&
      window.translations[currentLang] &&
      window.translations[currentLang].bufferAnalysis;

    if (!t) return;

    let content = "";

    if (neighborhoods.length === 0) {
      content = `
                <div style="text-align: center; padding: 20px;">
                    <i class="fas fa-info-circle" style="font-size: 48px; color: #17a2b8; margin-bottom: 15px;"></i>
                    <h5 style="color: #495057; margin-bottom: 10px;">${t.noNeighborhoodsFound}</h5>
                    <p style="color: #6c757d; font-size: 14px;">
                        ${t.radiusInfo}: <strong>${analysisRadius} ${t.kilometer}</strong><br>
                        ${t.tryDifferent}
                    </p>
                </div>
            `;
    } else {
      content = `
                <div style="margin-bottom: 20px;">
                    <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                        <h5 style="color: #155724; margin-bottom: 8px;">
                            <i class="fas fa-check-circle" style="margin-left: 5px;"></i>
                            ${t.analysisSummary}
                        </h5>
                        <div style="display: flex; justify-content: space-between; font-size: 14px;">
                            <span><strong>${t.radius}:</strong> ${analysisRadius} ${t.kilometer}</span>
                            <span><strong>${t.neighborhoodsCount}:</strong> ${neighborhoods.length}</span>
                        </div>
                    </div>
                    
                    <h5 style="color: #495057; margin-bottom: 15px;">
                        <i class="fas fa-list" style="margin-left: 5px;"></i>
                        ${t.intersectingNeighborhoods}
                    </h5>
                    <ul style="list-style: none; padding: 0; margin: 0;">
            `;

      neighborhoods.forEach((neighborhood, index) => {
        content += `
                    <li style="
                        background: #f8f9fa;
                        border: 1px solid #dee2e6;
                        border-radius: 6px;
                        padding: 12px;
                        margin-bottom: 8px;
                        display: flex;
                        align-items: center;
                        transition: background-color 0.3s ease;
                    " onmouseover="this.style.backgroundColor='#e9ecef';" onmouseout="this.style.backgroundColor='#f8f9fa';">
                        <span style="
                            background: #dc3545;
                            color: white;
                            border-radius: 50%;
                            width: 24px;
                            height: 24px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 12px;
                            font-weight: bold;
                            margin-left: 10px;
                        ">${index + 1}</span>
                        <span style="font-weight: 500;">${neighborhood}</span>
                    </li>
                `;
      });

      content += `
                    </ul>
                </div>
            `;
    }

    resultsDiv.innerHTML = content;

    // show the modal
    modal.style.display = "block";
    modal.classList.remove("modal-hidden");
    modal.classList.add("modal-visible");
  }

  /**
   * close the modal
   */
  function closeModal() {
    const modal = document.getElementById("report-modal");
    if (modal) {
      modal.classList.remove("modal-visible");
      modal.classList.add("modal-hidden");
    }

    // restore original click handlers if they were not already restored
    if (isSelectingCenter) {
      removeClickListenersFromLayers();
      isSelectingCenter = false;
      document.getElementById("map").style.cursor = "";
      
      // Show notification that normal interactions are restored
      showNotification("تم إغلاق التقرير واستعادة وظائف النقر الطبيعية على الخريطة. يمكنك الآن النقر على الأحياء ودوائر الخدمات ومدينة حلب.", "info");
    }
  }

  /**
   * show an error message
   */
  function showError(message) {
    alert(message || "حدث خطأ في التحليل");
  }

  /**
   * cancel center selection
   */
  function cancelCenterSelection() {
    if (!isSelectingCenter) return;

    console.log("Canceling center selection...");
    
    isSelectingCenter = false;
    document.getElementById("map").style.cursor = "";

    // remove all click listeners from layers and restore original handlers
    removeClickListenersFromLayers();

    // update the buttons
    updateButtons(false);

    // update the button text back to original
    const selectBtn = document.getElementById("select-center-btn");
    const currentLang = document.documentElement.lang || "ar";
    const t =
      window.translations &&
      window.translations[currentLang] &&
      window.translations[currentLang].bufferAnalysis;

    if (selectBtn && t) {
      selectBtn.innerHTML =
        '<i class="fas fa-crosshairs"></i> <span>' +
        t.selectCenterBtn +
        "</span>";
      selectBtn.style.background =
        "linear-gradient(135deg, #dc3545 0%, #c82333 100%)";
      selectBtn.disabled = false;
    }

    // Show notification only if we're not in the middle of starting selection
    showNotification("تم إلغاء تحديد المركز.", "warning");
  }

  /**
   * cancel analysis and reset to normal state
   */
  function cancelAnalysis() {
    console.log("Canceling analysis...");
    
    // Cancel center selection if active
    if (isSelectingCenter) {
      cancelCenterSelection();
    }

    // Reset all analysis variables
    analysisCenter = null;
    analysisRadius = 1;

    // Reset the radius value in the field
    const radiusInput = document.getElementById("buffer-radius-km");
    if (radiusInput) {
      radiusInput.value = 1;
    }

    // Remove any existing circles
    if (bufferCircle) {
      window.map.removeLayer(bufferCircle);
      bufferCircle = null;
    }

    // Reset the neighborhoods styles
    resetNeighborhoodStyles();

    // Remove all click listeners from layers and restore original handlers
    removeClickListenersFromLayers();

    // Update the buttons
    updateButtons(false);

    // Show notification
    showNotification("تم إلغاء التحليل المكاني والعودة للوضع الطبيعي. يمكنك الآن النقر على الأحياء ودوائر الخدمات ومدينة حلب لعرض المعلومات.", "success");
  }

  /**
   * show notification to user
   */
  function showNotification(message, type = "info") {
    // Remove any existing notifications first
    const existingNotifications = document.querySelectorAll('[data-notification="buffer-analysis"]');
    existingNotifications.forEach(notification => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });

    // Create notification element
    const notification = document.createElement("div");
    notification.setAttribute("data-notification", "buffer-analysis");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      font-family: 'Cairo', sans-serif;
      font-size: 14px;
      z-index: 10000;
      max-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    // Set background color based on type
    switch (type) {
      case "success":
        notification.style.backgroundColor = "#28a745";
        break;
      case "error":
        notification.style.backgroundColor = "#dc3545";
        break;
      case "warning":
        notification.style.backgroundColor = "#ffc107";
        notification.style.color = "#333";
        break;
      default:
        notification.style.backgroundColor = "#17a2b8";
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  // initialize the module when the page is loaded
  document.addEventListener("DOMContentLoaded", function () {
    // wait for the map to be ready
    const checkMapReady = setInterval(function () {
      if (window.map && typeof window.map.on === "function") {
        clearInterval(checkMapReady);
        initBufferAnalysis();
      }
    }, 100);
  });

  /**
   * start a new analysis
   */
  function startNewAnalysis() {
    // close the modal
    closeModal();

    // reset all variables
    analysisCenter = null;
    analysisRadius = 1;

    // reset the radius value in the field
    const radiusInput = document.getElementById("buffer-radius-km");
    if (radiusInput) {
      radiusInput.value = 1;
    }

    // remove all click listeners from layers and restore original handlers
    removeClickListenersFromLayers();

    // update the buttons
    updateButtons(false);

    // remove any existing circles
    if (bufferCircle) {
      window.map.removeLayer(bufferCircle);
      bufferCircle = null;
    }

    // reset the neighborhoods styles
    resetNeighborhoodStyles();

    // show notification
    showNotification("تم إعادة تعيين التحليل. يمكنك الآن النقر على الأحياء ودوائر الخدمات ومدينة حلب لعرض المعلومات أو تحديد مركز جديد.", "success");
  }

  /**
   * reset analysis completely
   */
  function resetAnalysis() {
    // Cancel center selection if active
    if (isSelectingCenter) {
      cancelCenterSelection();
    }

    // Reset all analysis variables
    analysisCenter = null;
    analysisRadius = 1;

    // Reset the radius value in the field
    const radiusInput = document.getElementById("buffer-radius-km");
    if (radiusInput) {
      radiusInput.value = 1;
    }

    // Remove any existing circles
    if (bufferCircle) {
      window.map.removeLayer(bufferCircle);
      bufferCircle = null;
    }

    // Reset the neighborhoods styles
    resetNeighborhoodStyles();

    // Remove all click listeners from layers and restore original handlers
    removeClickListenersFromLayers();

    // Update the buttons
    updateButtons(false);

    // Show notification
    showNotification("تم إعادة تعيين التحليل المكاني. يمكنك الآن النقر على الأحياء ودوائر الخدمات ومدينة حلب لعرض المعلومات.", "success");
  }

  // listen for language changes
  document.addEventListener("languageChanged", function (e) {
    updateLanguage();
  });

  // export the functions for global use
  window.BufferAnalysis = {
    init: initBufferAnalysis,
    startCenterSelection: startCenterSelection,
    runAnalysis: runBufferAnalysis,
    closeModal: closeModal,
    startNewAnalysis: startNewAnalysis,
    cancelCenterSelection: cancelCenterSelection,
    cancelAnalysis: cancelAnalysis,
    resetAnalysis: resetAnalysis,
    reinitializeOriginalLayerHandlers: reinitializeOriginalLayerHandlers,
    updateLanguage: updateLanguage,
    showNotification: showNotification,
  };
})();
