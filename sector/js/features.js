/**
 * features.js
 * advanced map functions: query builder, print map
 * (export and import functions are in import-export.js)
 */

// Query Builder functionality
// This function is now handled by query.js - removed to avoid conflicts
function initializeQueryBuilder() {
  console.log("Query builder initialization is handled by query.js");
  // No longer needed here - query.js handles all query builder functionality
}

// showValueList function is now handled by query.js - removed to avoid conflicts

// Print Map functionality
function initializePrintMap() {
  const printBtn = document.getElementById("printMapBtn");
  if (!printBtn) return;

  printBtn.addEventListener("click", async function () {
    const mapElement = document.getElementById("map");
    if (!mapElement) {
      alert("لم يتم العثور على عنصر الخريطة.");
      return;
    }

    // Show a loading indicator on the button
    printBtn.disabled = true;
    printBtn.style.opacity = "0.7";
    printBtn.style.cursor = "wait";
    const originalContent = printBtn.innerHTML;
    printBtn.innerHTML = 'جاري التحميل...';

    try {
      // Force map to redraw and wait for it to finish
      map.invalidateSize();
      await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay

      // Use html2canvas to capture the map
      const canvas = await html2canvas(mapElement, {
        useCORS: true, // Important for loading external tile layers
        backgroundColor: null, // Transparent background
        logging: false, // Disable logging to console
      });

      // Create a link to download the image
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "map-capture.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (err) {
      console.error("Error capturing map:", err);
      alert("حدث خطأ أثناء التقاط صورة الخريطة: " + err.message);
    } finally {
      // Restore the button state
      printBtn.disabled = false;
      printBtn.style.opacity = "1";
      printBtn.style.cursor = "pointer";
      printBtn.innerHTML = originalContent;
    }
  });
}


// Initialize all features when document is loaded
function initializeAllFeatures() {
  console.log("Initializing all features...");
  try {
    initializeQueryBuilder();
    initializePrintMap();
    console.log("All features initialized successfully");
  } catch (error) {
    console.error("Error initializing features:", error);
  }
}

// Wait for both DOM and all resources to be loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeAllFeatures);
} else {
  initializeAllFeatures();
}
