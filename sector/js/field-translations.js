/**
 * field-translations.js
 * Contains translations for field names in the tabs and language switching functionality
 */

// Field translations for all tabs
const fieldTranslations = {
  ar: {
    // Common fields
    id: "معرف",
    neighborhood_id: "معرف الحي",
    status: "الحالة",
    needs: "الاحتياجات",

    // humanitarian interventions
    type: "نوع التدخل",
    start_date: "تاريخ البدء",
    org: "المنظمة المسؤولة",

    // basic markets
    name: "الاسم",
    shops: "عدد المحلات",
    hours: "ساعات العمل",

    // solid waste management
    dumping_sites: "مكبات عشوائية",
    cleanliness: "مستوى نظافة الشوارع",
    pest_control: "مكافحة القوارض",
    rubble_removal: "إزالة الأنقاض",

    // parks and living spaces
    coverage: "منطقة الخدمة",
    water: "توفر المياه",
    lighting: "الإضاءة",
    furniture: "أثاث الحدائق",

    // educational facilities & health centers
    infrastructure: "حالة مرافق البنية التحتية",
    staff: "حالة الموظفين",
    supplies: "حالة المستهلكات",

    // electricity network
    transformer_damage: "ضرر المحول",
    line_damage: "ضرر الخط",

    // communications network
    landline_damage: "ضرر الخط الأرضي",
    tower_damage: "ضرر البرج",

    // water supply & sewage network
    connected: "متصل بالشبكة",
    main_damage: "ضرر رئيسي",
    secondary_damage: "ضرر فرعي",
    main_status: "تشغيل رئيسي",
    secondary_status: "تشغيل فرعي",
    damage_percent: "نسبة الضرر",
    operation_percent: "نسبة التشغيل",

    // housing damage
    units_total: "إجمالي الوحدات",
    vacant_units: "الوحدات الشاغرة",
    severe_damage: "ضرر شديد",
    medium_damage: "ضرر متوسط",
    light_damage: "ضرر خفيف",
    undamaged_units: "وحدات سليمة",

    // urban fabric
    urban_area: "المنطقة الحضرية",
    texture_status: "حالة النسيج",
    informal_percent: "السكن العشوائي",
    highrise_percent: "نسبة المساكن الطابقية",
    traditional_percent: "نسبة المساكن التقليدية",
    notes: "ملاحظات",

    // population changes
    population: "عدد السكان",
    migrants: "نسبة المهاجرين",
    returnees: "نسبة العائدين",

    // neighborhood committee members
    mukhtar_name: "اسم المختار",
    members_count: "عدد الأعضاء",
    secretary_name: "اسم أمين السر",
    male_percentage: "نسبة الذكور من الأعضاء",

    // new fields
    "الوحدات الإدارية": "الوحدات الإدارية",
  },
  en: {
    // Common fields
    id: "ID",
    neighborhood_id: "Neighborhood ID",
    status: "Status",
    needs: "Needs",

    // humanitarian interventions
    type: "Intervention Type",
    start_date: "Start Date",
    org: "Responsible Organization",

    // basic markets
    name: "Name",
    shops: "Number of Shops",
    hours: "Working Hours",

    // solid waste management
    dumping_sites: "Random Dumping Sites",
    cleanliness: "Street Cleanliness Level",
    pest_control: "Pest Control",
    rubble_removal: "Rubble Removal",

    // parks and living spaces
    coverage: "Service Area",
    water: "Water Availability",
    lighting: "Lighting",
    furniture: "Park Furniture",

    // educational facilities & health centers
    infrastructure: "Infrastructure Facilities Condition",
    staff: "Staff Status",
    supplies: "Supplies Status",

    // electricity network
    transformer_damage: "Transformer Damage",
    line_damage: "Line Damage",

    // communications network
    landline_damage: "Landline Damage",
    tower_damage: "Tower Damage",

    // water supply & sewage network
    connected: "Connected to Network",
    main_damage: "Main Damage",
    secondary_damage: "Secondary Damage",
    main_status: "Main Operation",
    secondary_status: "Secondary Operation",
    damage_percent: "Damage Percentage",
    operation_percent: "Operation Percentage",

    // housing damage
    units_total: "Total Units",
    vacant_units: "Vacant Units",
    severe_damage: "Severe Damage",
    medium_damage: "Medium Damage",
    light_damage: "Light Damage",
    undamaged_units: "Undamaged Units",

    // urban fabric
    urban_area: "Urban Area",
    texture_status: "Texture Status",
    informal_percent: "Informal Percentage",
    highrise_percent: "High-rise Percentage",
    traditional_percent: "Traditional Percentage",
    notes: "Notes",

    // population changes
    population: "Population",
    migrants: "Migrants Percentage",
    returnees: "Returnees Percentage",

    // neighborhood committee members
    mukhtar_name: "Mukhtar Name",
    members_count: "Number of Members",
    secretary_name: "Secretary Name",
    male_percentage: "Male Members Percentage",

    // new fields
    "الوحدات الإدارية": "Administrative Units",
  },
};

// Status translations
const statusTranslations = {
  ar: {
    // Common statuses
    active: "نشط",
    pending: "معلق",
    completed: "مكتمل",
    cancelled: "ملغى",

    // Availability
    available: "متوفر",
    limited: "محدود",
    unavailable: "غير متوفر",

    // Quality levels
    good: "جيد",
    medium: "متوسط",
    poor: "ضعيف",
    bad: "سيء",

    // Operation status
    fully_operational: "يعمل كاملاً",
    partially_operational: "يعمل جزئياً",
    not_operational: "متوقف",

    // Yes/No
    yes: "نعم",
    no: "لا",
  },
  en: {
    // Common statuses
    active: "Active",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",

    // Availability
    available: "Available",
    limited: "Limited",
    unavailable: "Unavailable",

    // Quality levels
    good: "Good",
    medium: "Medium",
    poor: "Poor",
    bad: "Bad",

    // Operation status
    fully_operational: "Fully Operational",
    partially_operational: "Partially Operational",
    not_operational: "Not Operational",

    // Yes/No
    yes: "Yes",
    no: "No",
  },
};

// Make translations available globally
window.fieldTranslations = fieldTranslations;
window.statusTranslations = statusTranslations;

// Complete UI translations (moved from map2.js)
const translations = {
  ar: {
    title: "نظام الإدارة الحضرية لمدينة حلب",
    settingsText: "إعدادات الحساب",
    logoutText: "تسجيل الخروج",
    rightsText: "Powerd by",
    companyName: "HI-Tech House",
    // Info panel buttons
    cancelChanges: "إلغاء التعديلات",
    saveChanges: "حفظ التغييرات",
    nextTab: "التالي",
    browseBtn: "استعراض",
    saveAllData: "تحديث جميع البيانات",
    saveAllWarning:
      "سيتم حفظ جميع التغييرات بشكل دائم. هل أنت متأكد من المتابعة؟",
    continue: "متابعة",
    cancel: "إلغاء",
    successMessage: "تم تحديث جميع البيانات بنجاح!",
    // Tab names
    tabs: {
      التدخلات_الإنسانية: "التدخلات الإنسانية",
      الأسواق_الأساسية: "الأسواق الأساسية",
      إدارة_النفايات_الصلبة: "إدارة النفايات الصلبة",

      شبكة_الكهرباء: "شبكة الكهرباء",
      شبكة_الاتصالات: "شبكة الاتصالات",
      إمدادات_المياه: "إمدادات المياه",
      شبكة_الصرف_الصحي: "شبكة الصرف الصحي",
      أضرار_الإسكان: "الضرر الفيزيائي",
      النسيج_الحضري: "النسيج الحضري",
      التغيرات_السكانية: "التغيرات السكانية",
      "أعضاء لجنة الحي": "أعضاء لجنة الحي",
      "معلومات التواصل مع لجنة الحي": "معلومات التواصل مع لجنة الحي",
      لجان_التنمية: "لجان التنمية",
      // Main tabs from index.html
      "التزود الأساسي": "التزود الأساسي",
      "الخدمة الصحية المركزية": "الخدمة الصحية المركزية",
      "مرافق البنية التحتية": "مرافق البنية التحتية",
      "الوحدات الإدارية": "الوحدات الإدارية",
      "الخدمات الأخرى": "الخدمات الأخرى",
      "قسم النظافة": "قسم النظافة",
      "الاقتصاد المحلي": "الاقتصاد المحلي",
      "الاقتصاد الزراعي": "الاقتصاد الزراعي",
      "تحليل علاقة الشركاء الفاعلين": "تحليل علاقة الشركاء الفاعلين",
      "الخدمات الإدارية": "الخدمات الإدارية",
    },
    // Sidebar labels
    sidebar: {
      layersManagement: "إدارة الطبقات",
      baseMaps: "الخرائط الأساسية",
      openStreetMap: "خريطة الشارع المفتوحة",
      satellite: "صور الأقمار الصناعية",
      terrain: "التضاريس",
      layers: "الطبقات",
      neighborhoods: "الأحياء",
      serviceSectors: "دوائر الخدمات",
      importExport: "إدارة البيانات",
      importLayer: "استيراد ملف",
      exportLayer: "تصدير الطبقة",
      exportFormat: "صيغة التصدير",
      symbolsColors: "الرموز والألوان",
      chooseLayer: "اختر طبقة...",
      color: "اللون:",
      transparency: "الشفافية:",
      lineWeight: "سمك الخط:",
      lineColor: "لون الخط:",
      apply: "تطبيق",
      reset: "إعادة الضبط",
      // Layer management translations
      mainLayers: "الطبقات الرئيسية",
      neighborhoodsBoundaries: "حدود الأحياء",
      neighborhoodsLabels: "مسميات الأحياء",
      serviceSectorsBoundaries: "حدود دوائر الخدمات",
      serviceSectorsLabels: "مسميات دوائر الخدمات",
      zoomToLayers: "تكبير للطبقات",
      zoomToLayer: "تكبير للطبقة",
      groupProperties: "خصائص المجموعة",
      layerProperties: "خصائص الطبقة",
      dragToReorder: "سحب لإعادة الترتيب",
      styleLayer: "تنسيق الطبقة",
      dataTable: "جدول البيانات",
      textFormatting: "تنسيق النصوص",
      visibilitySettings: "إعدادات الرؤية",
      autoCloseMessage: "سيتم الإغلاق تلقائيًا",
      pinSidebar: "تثبيت القائمة",
      // Import/Export section
      dataManagement: "إدارة البيانات",
      importData: "استيراد البيانات",
      exportData: "تصدير البيانات",
      importFile: "استيراد ملف",
      importFromUrl: "استيراد من رابط",
      importFromService: "استيراد من خدمة",
      supportedFormats: "الصيغ المدعومة: GeoJSON, KML, Shapefile, CSV",
      chooseLayerExport: "اختر الطبقة للتصدير:",
      selectLayer: "-- اختر طبقة --",
      exportFormat: "صيغة التصدير:",
      exportLayer: "تصدير الطبقة",
      aleppoCityBoundaries: "مدينة حلب (حدود)",
      neighborhoodsBoundaries: "الأحياء (حدود)",
      neighborhoodsLabels: "الأحياء (مسميات)",
      serviceSectorsBoundaries: "دوائر الخدمات (حدود)",
      serviceSectorsLabels: "دوائر الخدمات (مسميات)",
      aleppoCity: "مدينة حلب",
      importData: "استيراد البيانات",
      exportData: "تصدير البيانات",
    },
    // Map info bar labels
    mapInfo: {
      scale: "المقياس",
      center: "المركز",
    },
    // Right sidebar
    analysisQueries: {
      title: "التحليلات والاستعلامات",
      queryBuilder: "منشئ الاستعلامات",
      chooseLayer: "اختر طبقة...",
      chooseField: "اختر حقل...",
      chooseOperation: "اختر العملية...",
      enterValue: "أدخل القيمة",
      addCondition: "إضافة شرط",
      runQuery: "تنفيذ الاستعلام",
      createQueryMessage: "قم بإنشاء استعلام وتنفيذه لعرض النتائج",
      // Query options
      neighborhoods: "الأحياء",
      serviceSectors: "دوائر الخدمات",
      contains: "يحتوي",
      // Auto-close indicator
      autoCloseMessage: "سيتم الإغلاق تلقائيًا",
      // Pin button
      pinSidebar: "تثبيت القائمة",
      // Additional query-related translations
      equal: "يساوي",
      notEqual: "لا يساوي",
      greaterThan: "أكبر من",
      lessThan: "أصغر من",
      greaterThanOrEqual: "أكبر من أو يساوي",
      lessThanOrEqual: "أصغر من أو يساوي",
      valueList: "قائمة القيم",
      selectValue: "اختر قيمة",
    },
    // Neighborhood Report
    neighborhoodReport: {
      title: "إنشاء تقرير عن الحي",
      chooseNeighborhood: "اختر الحي للتقرير:",
      selectNeighborhood: "-- اختر حي --",
      reportOptions: "خيارات التقرير",
      includeMap: "تضمين خريطة الحي",
      includeInfo: "معلومات الحي التفصيلية",
      includeSectoral: "الوظائف القطاعية الحضرية",
      includeDamage: "نسب الأضرار",
      exportButton: "تصدير تقرير PDF",
      exportingButton: "جاري إنشاء التقرير...",
      selectNeighborhoodFirst: "يرجى اختيار حي أولاً",
      neighborhoodNotFound: "لم يتم العثور على بيانات الحي المحدد",
      exportSuccess: "تم تصدير التقرير بنجاح! تحقق من مجلد التنزيلات",
      exportError: "حدث خطأ أثناء إنشاء التقرير. يرجى المحاولة مرة أخرى",
    },
    // Buffer Analysis
    bufferAnalysis: {
      sectionTitle: "التحليل المكاني",
      title: "تحليل النطاق (Buffer)",
      radiusLabel: "نصف القطر (بالكيلومتر):",
      selectCenterBtn: "1. تحديد المركز على الخريطة",
      selectingCenterBtn: "انقر على الخريطة لتحديد المركز",
      centerSelectedBtn: "تم تحديد المركز",
      runAnalysisBtn: "2. حساب تقرير النطاق",
      reportTitle: "نتائج تحليل النطاق",
      closeBtn: "إغلاق",
      noNeighborhoodsFound: "لا توجد أحياء ضمن النطاق المحدد",
      radiusInfo: "نصف القطر المحدد",
      tryDifferent: "جرب زيادة نصف القطر أو تغيير المركز",
      analysisSummary: "ملخص التحليل",
      radius: "نصف القطر",
      neighborhoodsCount: "عدد الأحياء",
      intersectingNeighborhoods: "الأحياء المتقاطعة مع النطاق:",
      newAnalysisBtn: "إجراء تحليل جديد",
      cancelAnalysisBtn: "إلغاء الحساب",
      selectCenterFirst: "يرجى تحديد المركز أولاً",
      layerNotAvailable: "طبقة الأحياء غير متوفرة",
      kilometer: "كيلومتر",
    },
    // Map controls
    mapControls: {
      layers: "الطبقات",
    },
    // Titles for toolbars and buttons
    titles: {
      zoomIn: "تكبير",
      zoomOut: "تصغير",
      home: "الرئيسية",
      measure: "قياس",
      draw: "رسم",
      printMap: "طباعة الخريطة",
      toggleTabs: "تبديل الألسنة",
      toggleSidebar: "تبديل الشريط الجانبي",
      toggleSidebarRight: "تبديل الشريط الجانبي الأيمن",
      layerColor: "لون الطبقة",
      transparency: "الشفافية",
      lineWeight: "سمك الخط",
      lineColor: "لون الخط",
      chooseSidebar: "اختيار الشريط الجانبي",
      chooseQueryTable: "اختيار جدول الاستعلام",
      chooseQueryField: "اختيار حقل الاستعلام",
      chooseQueryOperator: "اختيار عملية الاستعلام",
      valueListBtn: "زر قائمة القيم",
      close: "إغلاق",
      backToTable: "العودة للجدول",
      chooseBasemap: "اختر الخريطة الأساسية",
      compassNorth: "الشمال"
    },
  },
  en: {
    title: "Urban Management System for Aleppo",
    settingsText: "Account Settings",
    logoutText: "Logout",
    rightsText: "Powerd by",
    companyName: "Hi-Tech House",
    // Info panel buttons
    cancelChanges: "Cancel Changes",
    saveChanges: "Save Changes",
    nextTab: "Next",
    browseBtn: "Browse",
    saveAllData: "Update All Data",
    saveAllWarning:
      "All changes will be saved permanently. Are you sure you want to continue?",
    continue: "Continue",
    cancel: "Cancel",
    successMessage: "All data saved successfully!",
    // Tab names
    tabs: {
      التدخلات_الإنسانية: "Humanitarian Interventions",
      الأسواق_الأساسية: "Basic Markets",
      إدارة_النفايات_الصلبة: "Solid Waste Management",

      شبكة_الكهرباء: "Electricity Network",
      شبكة_الاتصالات: "Communications Network",
      إمدادات_المياه: "Water Supply",
      شبكة_الصرف_الصحي: "Sewage Network",
      أضرار_الإسكان: "Physical Damage",
      النسيج_الحضري: "Urban Fabric",
      التغيرات_السكانية: "Population Changes",
      "أعضاء لجنة الحي": "Neighborhood Committee Members",
      "معلومات التواصل مع لجنة الحي": "Neighborhood Committee Contact Info",
      لجان_التنمية: "Development Committees",
      // Main tabs from index.html
      "التزود الأساسي": "Basic Supply",
      "الخدمة الصحية المركزية": "Central Health Service",
      "مرافق البنية التحتية": "Infrastructure Facilities",
      "الوحدات الإدارية": "Administrative Units",
      "الخدمات الأخرى": "Other Services",
      "قسم النظافة": "Sanitation Department",
      "الاقتصاد المحلي": "Local Economy",
      "الاقتصاد الزراعي": "Agricultural Economy",
      "تحليل علاقة الشركاء الفاعلين": "Stakeholder Relationship Analysis",
      "الخدمات الإدارية": "Administrative Services",
    },
    // Sidebar labels
    sidebar: {
      layersManagement: "Layers Management",
      baseMaps: "Base Maps",
      openStreetMap: "OpenStreetMap",
      satellite: "Satellite Imagery",
      terrain: "Terrain",
      layers: "Layers",
      neighborhoods: "Neighborhoods",
      serviceSectors: "Service Sectors",
      importExport: "Data Management",
      importLayer: "Import File",
      exportLayer: "Export Layer",
      exportFormat: "Export Format",
      symbolsColors: "Symbols and Colors",
      chooseLayer: "Choose Layer...",
      color: "Color:",
      transparency: "Transparency:",
      lineWeight: "Line Weight:",
      lineColor: "Line Color:",
      apply: "Apply",
      reset: "Reset",
      // Layer management translations
      mainLayers: "Main Layers",
      neighborhoodsBoundaries: "Neighborhood Boundaries",
      neighborhoodsLabels: "Neighborhood Labels",
      serviceSectorsBoundaries: "Service Sectors Boundaries",
      serviceSectorsLabels: "Service Sectors Labels",
      zoomToLayers: "Zoom to Layers",
      zoomToLayer: "Zoom to Layer",
      groupProperties: "Group Properties",
      layerProperties: "Layer Properties",
      dragToReorder: "Drag to Reorder",
      styleLayer: "Style Layer",
      dataTable: "Data Table",
      textFormatting: "Text Formatting",
      visibilitySettings: "Visibility Settings",
      autoCloseMessage: "Will close automatically",
      pinSidebar: "Pin sidebar",
      // Import/Export section
      dataManagement: "Data Management",
      importData: "Import Data",
      exportData: "Export Data",
      importFile: "Import File",
      importFromUrl: "Import from URL",
      importFromService: "Import from Service",
      supportedFormats: "Supported formats: GeoJSON, KML, Shapefile, CSV",
      chooseLayerExport: "Choose layer to export:",
      selectLayer: "-- Select Layer --",
      exportFormat: "Export Format:",
      exportLayer: "Export Layer",
      aleppoCityBoundaries: "Aleppo City (Boundaries)",
      neighborhoodsBoundaries: "Neighborhoods (Boundaries)",
      neighborhoodsLabels: "Neighborhoods (Labels)",
      serviceSectorsBoundaries: "Service Sectors (Boundaries)",
      serviceSectorsLabels: "Service Sectors (Labels)",
      aleppoCity: "Aleppo City",
      importData: "Import Data",
      exportData: "Export Data",
    },
    // Map info bar labels
    mapInfo: {
      scale: "Scale",
      center: "Center",
    },
    // Right sidebar
    analysisQueries: {
      title: "Analysis and Queries",
      queryBuilder: "Query Builder",
      chooseLayer: "Choose Layer...",
      chooseField: "Choose Field...",
      chooseOperation: "Choose Operation...",
      enterValue: "Enter Value",
      addCondition: "Add Condition",
      runQuery: "Run Query",
      createQueryMessage: "Create and run a query to view results",
      // Query options
      neighborhoods: "Neighborhoods",
      serviceSectors: "Service Sectors",
      contains: "Contains",
      // Auto-close indicator
      autoCloseMessage: "Will close automatically",
      // Pin button
      pinSidebar: "Pin sidebar",
      // Additional query-related translations
      equal: "Equals",
      notEqual: "Not Equal",
      greaterThan: "Greater Than",
      lessThan: "Less Than",
      greaterThanOrEqual: "Greater Than or Equal",
      lessThanOrEqual: "Less Than or Equal",
      valueList: "Value List",
      selectValue: "Select Value",
    },
    // Neighborhood Report
    neighborhoodReport: {
      title: "Generate Neighborhood Report",
      chooseNeighborhood: "Choose neighborhood for report:",
      selectNeighborhood: "-- Select Neighborhood --",
      reportOptions: "Report Options",
      includeMap: "Include neighborhood map",
      includeInfo: "Detailed neighborhood information",
      includeSectoral: "Urban sectoral functions",
      includeDamage: "Damage ratios",
      exportButton: "Export PDF Report",
      exportingButton: "Generating report...",
      selectNeighborhoodFirst: "Please select a neighborhood first",
      neighborhoodNotFound: "Neighborhood data not found",
      exportSuccess:
        "Report exported successfully! Check your downloads folder",
      exportError: "Error generating report. Please try again",
    },
    // Buffer Analysis
    bufferAnalysis: {
      sectionTitle: "Spatial Analysis",
      title: "Buffer Analysis",
      radiusLabel: "Radius (in kilometers):",
      selectCenterBtn: "1. Select Center on Map",
      selectingCenterBtn: "Click on map to select center",
      centerSelectedBtn: "Center Selected",
      runAnalysisBtn: "2. Calculate Buffer Report",
      reportTitle: "Buffer Analysis Results",
      closeBtn: "Close",
      noNeighborhoodsFound:
        "No neighborhoods found within the specified buffer",
      radiusInfo: "Specified radius",
      tryDifferent: "Try increasing the radius or changing the center",
      analysisSummary: "Analysis Summary",
      radius: "Radius",
      neighborhoodsCount: "Number of Neighborhoods",
      intersectingNeighborhoods: "Neighborhoods intersecting with buffer:",
      newAnalysisBtn: "Perform New Analysis",
      cancelAnalysisBtn: "Cancel Analysis",
      selectCenterFirst: "Please select center first",
      layerNotAvailable: "Neighborhoods layer not available",
      kilometer: "kilometer",
    },
    // Map controls
    mapControls: {
      layers: "Layers",
    },
    // Titles for toolbars and buttons
    titles: {
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      home: "Home",
      measure: "Measure",
      draw: "Draw",
      printMap: "Print Map",
      toggleTabs: "Toggle Tabs",
      toggleSidebar: "Sidebar Toggle",
      toggleSidebarRight: "Toggle Right Sidebar",
      layerColor: "Layer Color",
      transparency: "Transparency",
      lineWeight: "Line Weight",
      lineColor: "Line Color",
      chooseSidebar: "Sidebar Select",
      chooseQueryTable: "Query Table Select",
      chooseQueryField: "Query Field Select",
      chooseQueryOperator: "Query Operator Select",
      valueListBtn: "Value List Button",
      close: "Close",
      backToTable: "Back to Table",
      chooseBasemap: "Choose Basemap",
      compassNorth: "North"
    },
  },
};

// Make translations available globally
window.translations = translations;

/**
 * Toggle language between Arabic and English
 */
function toggleLanguage() {
  // switch language between arabic and english
  const currentLang = document.documentElement.lang || "ar";
  const newLang = currentLang === "ar" ? "en" : "ar";
  switchLanguage(newLang);

  // update language toggle button text
  const langToggleText = document.getElementById("langToggleText");
  if (langToggleText) {
    langToggleText.textContent = newLang === "ar" ? "تغيير اللغة" : "Change Language";
  }

  // save selected language in local storage
  localStorage.setItem("preferredLanguage", newLang);
}

/**
 * Switch the interface language and update all UI elements
 * @param {string} lang - Language code ('ar' or 'en')
 */
function switchLanguage(lang) {
  // change page direction
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // Apply fixed direction to no-translate elements
  document.querySelectorAll(".no-translate").forEach((element) => {
    // Keep header and footer with fixed direction regardless of language
    element.style.direction = "rtl"; // Always keep RTL for header and footer

    // Ensure the layout doesn't change when switching languages
    if (element.id === "mainHeader") {
      // Fix header elements
      const rightLogos = element.querySelector(".header-logos.right-logos");
      const leftControls = element.querySelector("div:first-child");
      const title = element.querySelector(".header-title");

      if (rightLogos) rightLogos.style.right = "20px";
      if (leftControls) leftControls.style.left = "20px";

    } else if (element.id === "mainFooter") {
      // Fix footer elements
      const copyright = element.querySelector(".copyright");
      const socialIcons = element.querySelector(".social-icons");

      if (copyright) copyright.style.left = "20px";
      if (socialIcons) socialIcons.style.right = "20px";
    }
  });

  // Ensure map-toolbar, drawing-tools-toolbar, measurement-tools-toolbar and tabs-container maintain RTL direction
  document
    .querySelectorAll(
      ".map-toolbar, .drawing-tools-toolbar, .measurement-tools-toolbar, .tabs-container"
    )
    .forEach((element) => {
      element.style.direction = "rtl";
    });

  // تحديث النصوص
  const t = window.translations[lang] || translations[lang];
  //document.title = t.title;

  // Skip translation for elements with no-translate class
  const noTranslateElements = document.querySelectorAll(".no-translate");

  // update menu - only if not in a no-translate container
  const settingsText = document.getElementById("settingsText");
  const logoutText = document.getElementById("logoutText");

  // Update menu buttons
  if (settingsText && t.settingsText) {
    settingsText.textContent = t.settingsText;
  }
  if (logoutText && t.logoutText) {
    logoutText.textContent = t.logoutText;
  }
  // Update language toggle button
  const langToggleText = document.getElementById("langToggleText");
  if (langToggleText) {
    langToggleText.textContent = lang === "ar" ? "تغيير اللغة" : "Change Language";
  }

  // update footer - only if not in a no-translate container
  const rightsText = document.getElementById("rightsText");
  const companyName = document.getElementById("companyName");

  // update titles - only if not in a no-translate container
  const titleAr = document.querySelector(".title-ar");
  const titleEn = document.querySelector(".title-en");

  // update tab names
  if (t.tabs) {
    document.querySelectorAll(".tab-button").forEach((button) => {
      if (isInNoTranslateContainer(button)) return;

      const tabId = button.getAttribute("data-tab");
      const tabSpan = button.querySelector("span:not(.tab-close)");
      if (tabSpan && tabId && t.tabs[tabId]) {
        tabSpan.textContent = t.tabs[tabId];
      }
    });
  }

  // Update all sidebar elements and other UI components
  updateSidebarElements(t);
  updateUrbanEffectivenessSection(t);
  updateAnalysisQueriesSection(t);
  updateInfoPanel(t);

  // Update Buffer Analysis section if available
  if (
    window.BufferAnalysis &&
    typeof window.BufferAnalysis.updateLanguage === "function"
  ) {
    window.BufferAnalysis.updateLanguage();
  }

  // Update map info bar when language changes
  if (
    typeof updateMapInfoBar === "function" &&
    window.map &&
    typeof window.map.getCenter === "function"
  ) {
    updateMapInfoBar();
  }
}

/**
 * Helper function to check if an element is inside a no-translate container
 * @param {Element} element - The element to check
 * @returns {boolean} - True if element is inside a no-translate container
 */
function isInNoTranslateContainer(element) {
  let parent = element.parentElement;
  while (parent) {
    if (parent.classList && parent.classList.contains("no-translate")) {
      return true;
    }
    parent = parent.parentElement;
  }
  return false;
}

/**
 * Update sidebar elements with translations
 * @param {Object} t - Translation object
 */
function updateSidebarElements(t) {
  if (!t.sidebar) return;

  // Left sidebar title - try multiple selectors to ensure we find the element
  const layersManagementTitle = document.querySelector(
    "#leftSidebar .sidebar-header h3"
  ) || document.querySelector(".left-sidebar .sidebar-header h3") || 
      document.querySelector('[id="leftSidebar"] .sidebar-header h3');
      
  if (
    layersManagementTitle &&
    !isInNoTranslateContainer(layersManagementTitle) &&
    t.sidebar.layersManagement
  ) {
    layersManagementTitle.classList.add("language-transition");
    setTimeout(() => {
      layersManagementTitle.textContent = t.sidebar.layersManagement;
      layersManagementTitle.classList.remove("language-transition");
    }, 150);
  }

  // Update all sidebar sections, labels, and controls
  updateLayerManagementSection(t);
  updateImportExportSection(t);
  updateStyleSection(t);
  
  // Right sidebar title
  const analysisQueriesTitle = document.querySelector(
    "#rightSidebar .sidebar-header h3"
  ) || document.querySelector(".right-sidebar .sidebar-header h3") || 
      document.querySelector('[id="rightSidebar"] .sidebar-header h3');
      
  if (
    analysisQueriesTitle &&
    !isInNoTranslateContainer(analysisQueriesTitle) &&
    t.analysisQueries &&
    t.analysisQueries.title
  ) {
    analysisQueriesTitle.classList.add("language-transition");
    setTimeout(() => {
      analysisQueriesTitle.textContent = t.analysisQueries.title;
      analysisQueriesTitle.classList.remove("language-transition");
    }, 150);
  }
}

/**
 * Update layer management section
 * هذه الدالة تضمن ترجمة كل عناصر leftSidebar الثابتة والديناميكية
 * @param {Object} t - Translation object
 */
function updateLayerManagementSection(t) {
  // عنوان إدارة الطبقات - try multiple selectors to ensure we find the element
  const layersManagementTitle = document.querySelector(
    "#leftSidebar .sidebar-header h3"
  ) || document.querySelector(".left-sidebar .sidebar-header h3") || 
      document.querySelector('[id="leftSidebar"] .sidebar-header h3');
      
  if (
    layersManagementTitle && 
    t.sidebar.layersManagement &&
    !isInNoTranslateContainer(layersManagementTitle)
  ) {
    layersManagementTitle.classList.add("language-transition");
    setTimeout(() => {
      layersManagementTitle.textContent = t.sidebar.layersManagement;
      layersManagementTitle.classList.remove("language-transition");
    }, 150);
  }

  // أسماء المجموعات
  const mainLayersGroupName = document.querySelector(
    '[data-layer-group="main-layers"] .layer-group-name'
  );
  if (mainLayersGroupName && t.sidebar.mainLayers) {
    mainLayersGroupName.textContent = t.sidebar.mainLayers;
  }

  const aleppoCityGroupName = document.querySelector(
    '[data-layer-group="aleppo-city"] .layer-group-name'
  );
  if (aleppoCityGroupName && t.sidebar.aleppoCity) {
    aleppoCityGroupName.textContent = t.sidebar.aleppoCity;
  }

  const neighborhoodsGroupName = document.querySelector(
    '[data-layer-group="neighborhoods"] .layer-group-name'
  );
  if (neighborhoodsGroupName && t.sidebar.neighborhoods) {
    neighborhoodsGroupName.textContent = t.sidebar.neighborhoods;
  }

  const serviceGroupName = document.querySelector(
    '[data-layer-group="service-sectors"] .layer-group-name'
  );
  if (serviceGroupName && t.sidebar.serviceSectors) {
    serviceGroupName.textContent = t.sidebar.serviceSectors;
  }

  // أسماء الطبقات
  const aleppoCityBoundariesLayer = document.querySelector(
    '[data-layer="aleppo-city-boundaries"] .layer-name'
  );
  if (aleppoCityBoundariesLayer && t.sidebar.aleppoCityBoundaries) {
    aleppoCityBoundariesLayer.textContent = t.sidebar.aleppoCityBoundaries;
  }

  const neighborhoodsBoundariesLayer = document.querySelector(
    '[data-layer="neighborhoods-polygons"] .layer-name'
  );
  if (neighborhoodsBoundariesLayer && t.sidebar.neighborhoodsBoundaries) {
    neighborhoodsBoundariesLayer.textContent = t.sidebar.neighborhoodsBoundaries;
  }

  const neighborhoodsLabelsLayer = document.querySelector(
    '[data-layer="neighborhoods-labels"] .layer-name'
  );
  if (neighborhoodsLabelsLayer && t.sidebar.neighborhoodsLabels) {
    neighborhoodsLabelsLayer.textContent = t.sidebar.neighborhoodsLabels;
  }

  const serviceSectorsBoundariesLayer = document.querySelector(
    '[data-layer="service-sectors-polygons"] .layer-name'
  );
  if (serviceSectorsBoundariesLayer && t.sidebar.serviceSectorsBoundaries) {
    serviceSectorsBoundariesLayer.textContent = t.sidebar.serviceSectorsBoundaries;
  }

  const serviceSectorsLabelsLayer = document.querySelector(
    '[data-layer="service-sectors-labels"] .layer-name'
  );
  if (serviceSectorsLabelsLayer && t.sidebar.serviceSectorsLabels) {
    serviceSectorsLabelsLayer.textContent = t.sidebar.serviceSectorsLabels;
  }
  
  // Update layers-header title inside leftSidebar
  const layersHeaderTitle = document.querySelector(
    ".layers-header h4"
  );
  if (layersHeaderTitle && t.sidebar.layersManagement) {
    const iconElement = layersHeaderTitle.querySelector("i");
    layersHeaderTitle.innerHTML = "";
    if (iconElement) layersHeaderTitle.appendChild(iconElement);
    layersHeaderTitle.appendChild(
      document.createTextNode(" " + t.sidebar.layersManagement)
    );
  }
}

/**
 * Update import/export section
 * @param {Object} t - Translation object
 */
function updateImportExportSection(t) {
  // Import/export title
  const importExportTitle = document.querySelector(".import-export-header h4");
  if (importExportTitle) {
    const iconElement = importExportTitle.querySelector("i");
    importExportTitle.innerHTML = "";
    if (iconElement) importExportTitle.appendChild(iconElement);
    importExportTitle.appendChild(
      document.createTextNode(" " + t.sidebar.dataManagement)
    );
  }

  // Import data section
  const importDataTitle = document.querySelector(
    ".data-operation-group h5:first-of-type"
  );
  if (importDataTitle) {
    const iconElement = importDataTitle.querySelector("i");
    importDataTitle.innerHTML = "";
    if (iconElement) importDataTitle.appendChild(iconElement);
    importDataTitle.appendChild(
      document.createTextNode(" " + t.sidebar.importData)
    );
  }

  // Export data section
  const exportDataTitle = document.querySelector(
    ".data-operation-group:nth-child(2) h5"
  );
  if (exportDataTitle) {
    const iconElement = exportDataTitle.querySelector("i");
    exportDataTitle.innerHTML = "";
    if (iconElement) exportDataTitle.appendChild(iconElement);
    exportDataTitle.appendChild(
      document.createTextNode(" " + t.sidebar.exportData)
    );
  }

  // Update import buttons
  const importLayerBtn = document.getElementById("importLayerBtn");
  if (importLayerBtn) {
    const spanElement = importLayerBtn.querySelector("span");
    if (spanElement) {
      spanElement.textContent = t.sidebar.importFile;
    }
  }

  const importFromUrlBtn = document.getElementById("importFromUrlBtn");
  if (importFromUrlBtn) {
    const spanElement = importFromUrlBtn.querySelector("span");
    if (spanElement) {
      spanElement.textContent = t.sidebar.importFromUrl;
    }
  }

  const importFromServiceBtn = document.getElementById("importFromServiceBtn");
  if (importFromServiceBtn) {
    const spanElement = importFromServiceBtn.querySelector("span");
    if (spanElement) {
      spanElement.textContent = t.sidebar.importFromService;
    }
  }

  // Update supported formats text
  const supportedFormatsElement = document.querySelector(".import-formats small");
  if (supportedFormatsElement) {
    supportedFormatsElement.textContent = t.sidebar.supportedFormats;
  }

  // Update export labels
  const chooseLayerLabel = document.querySelector('label[for="exportLayerSelect"]');
  if (chooseLayerLabel) {
    chooseLayerLabel.textContent = t.sidebar.chooseLayerExport;
  }

  const exportFormatLabel = document.querySelector('label[for="exportFormat"]');
  if (exportFormatLabel) {
    exportFormatLabel.textContent = t.sidebar.exportFormat;
  }

  // Update export select options
  const exportLayerSelect = document.getElementById("exportLayerSelect");
  if (exportLayerSelect) {
    const firstOption = exportLayerSelect.querySelector('option[value=""]');
    if (firstOption) firstOption.textContent = t.sidebar.selectLayer;

    // Update specific options
    const aleppoCityOption = exportLayerSelect.querySelector('option[value="aleppo-city"]');
    if (aleppoCityOption) aleppoCityOption.textContent = t.sidebar.aleppoCityBoundaries;

    const neighborhoodsOption = exportLayerSelect.querySelector('option[value="neighborhoods"]');
    if (neighborhoodsOption) neighborhoodsOption.textContent = t.sidebar.neighborhoodsBoundaries;

    const neighborhoodsLabelsOption = exportLayerSelect.querySelector('option[value="neighborhood-labels"]');
    if (neighborhoodsLabelsOption) neighborhoodsLabelsOption.textContent = t.sidebar.neighborhoodsLabels;

    const serviceSectorsOption = exportLayerSelect.querySelector('option[value="service-sectors"]');
    if (serviceSectorsOption) serviceSectorsOption.textContent = t.sidebar.serviceSectorsBoundaries;

    const serviceSectorsLabelsOption = exportLayerSelect.querySelector('option[value="service-sector-labels"]');
    if (serviceSectorsLabelsOption) serviceSectorsLabelsOption.textContent = t.sidebar.serviceSectorsLabels;
  }

  // Update export button
  const exportLayerBtn = document.getElementById("exportLayerBtn");
  if (exportLayerBtn) {
    const spanElement = exportLayerBtn.querySelector("span");
    if (spanElement) {
      spanElement.textContent = t.sidebar.exportLayer;
    }
  }
}

/**
 * Update style section
 * @param {Object} t - Translation object
 */
function updateStyleSection(t) {
  // Style section title
  const symbolsColorsTitle = document.querySelector(
    ".sidebar-section:last-child h4"
  );
  if (symbolsColorsTitle) {
    symbolsColorsTitle.textContent = t.sidebar.symbolsColors;
  }

  // Style controls
  const colorLabel = document.getElementById("colorLabel");
  const opacityLabel = document.getElementById("opacityLabel");
  const lineWeightLabel = document.getElementById("lineWeightLabel");
  const lineColorLabel = document.getElementById("lineColorLabel");
  const applyStyleBtn = document.getElementById("applyStyleBtn");
  const resetStyleBtn = document.getElementById("resetStyleBtn");

  if (colorLabel) colorLabel.textContent = t.sidebar.color;
  if (opacityLabel) opacityLabel.textContent = t.sidebar.transparency;
  if (lineWeightLabel) lineWeightLabel.textContent = t.sidebar.lineWeight;
  if (lineColorLabel) lineColorLabel.textContent = t.sidebar.lineColor;

  if (applyStyleBtn) {
    const iconElement = applyStyleBtn.querySelector("i");
    applyStyleBtn.innerHTML = "";
    if (iconElement) applyStyleBtn.appendChild(iconElement);
    applyStyleBtn.appendChild(document.createTextNode(" " + t.sidebar.apply));
  }

  if (resetStyleBtn) {
    const iconElement = resetStyleBtn.querySelector("i");
    resetStyleBtn.innerHTML = "";
    if (iconElement) resetStyleBtn.appendChild(iconElement);
    resetStyleBtn.appendChild(document.createTextNode(" " + t.sidebar.reset));
  }
}

/**
 * Update urban effectiveness section
 * @param {Object} t - Translation object
 */
function updateUrbanEffectivenessSection(t) {
  if (!t.urbanEffectiveness) return;

  const ue = t.urbanEffectiveness;

  // Main section title
  const urbanEffectivenessTitle = document.getElementById(
    "urban-effectiveness-title"
  );
  if (urbanEffectivenessTitle) {
    const iconElement = urbanEffectivenessTitle.querySelector("i");
    urbanEffectivenessTitle.innerHTML = "";
    if (iconElement) urbanEffectivenessTitle.appendChild(iconElement);
    urbanEffectivenessTitle.appendChild(
      document.createTextNode(" " + ue.title)
    );
  }

  // Sectoral functions subsection
  const sectoralFunctionsTitle = document.getElementById(
    "sectoral-functions-title"
  );
  if (sectoralFunctionsTitle) {
    const iconElement = sectoralFunctionsTitle.querySelector("i");
    sectoralFunctionsTitle.innerHTML = "";
    if (iconElement) sectoralFunctionsTitle.appendChild(iconElement);
    sectoralFunctionsTitle.appendChild(
      document.createTextNode(" " + ue.sectoralFunctions.title)
    );
  }

  const sectoralFunctionsDescription = document.getElementById(
    "sectoral-functions-description"
  );
  if (sectoralFunctionsDescription) {
    sectoralFunctionsDescription.textContent = ue.sectoralFunctions.description;
  }

  const sectoralFunctionsButtonText = document.getElementById(
    "sectoral-functions-button-text"
  );
  if (sectoralFunctionsButtonText) {
    sectoralFunctionsButtonText.textContent = ue.sectoralFunctions.buttonText;
  }
}

/**
 * Update analysis queries section
 * @param {Object} t - Translation object
 */
function updateAnalysisQueriesSection(t) {
  if (!t.analysisQueries) return;

  const aq = t.analysisQueries;

  // Right sidebar title
  const rightSidebarTitle = document.querySelector(
    "#rightSidebar .sidebar-header h3"
  );
  if (rightSidebarTitle) {
    rightSidebarTitle.classList.add("language-transition");
    setTimeout(() => {
      rightSidebarTitle.textContent = aq.title;
      rightSidebarTitle.classList.remove("language-transition");
    }, 150);
  }

  // Query builder title - try multiple selectors to ensure we find the element
  const queryBuilderTitle = document.querySelector(
    "#rightSidebar .sidebar-section:nth-child(2) h4"
  ) || document.querySelector(".right-sidebar .sidebar-section:nth-child(2) h4") ||
      document.querySelector('[id="rightSidebar"] .sidebar-section:nth-child(2) h4') ||
      document.querySelector("#rightSidebar .sidebar-section h4") ||
      document.querySelector(".right-sidebar .sidebar-section h4");
      
  if (queryBuilderTitle && aq.queryBuilder) {
    queryBuilderTitle.classList.add("language-transition");
    setTimeout(() => {
      queryBuilderTitle.textContent = aq.queryBuilder;
      queryBuilderTitle.classList.remove("language-transition");
    }, 150);
  }

  // Update query controls
  const queryTableSelect = document.getElementById("queryTableSelect");
  const queryFieldSelect = document.getElementById("queryFieldSelect");
  const queryOperatorSelect = document.getElementById("queryOperatorSelect");
  const queryValueInput = document.getElementById("queryValueInput");

  if (queryTableSelect) {
    const firstOption = queryTableSelect.querySelector("option[value='']");
    if (firstOption) firstOption.textContent = aq.chooseLayer;
  }

  if (queryFieldSelect) {
    const firstOption = queryFieldSelect.querySelector("option[value='']");
    if (firstOption) firstOption.textContent = aq.chooseField;
  }

  if (queryOperatorSelect) {
    const firstOption = queryOperatorSelect.querySelector("option[value='']");
    if (firstOption) firstOption.textContent = aq.chooseOperation;
  }

  if (queryValueInput) queryValueInput.placeholder = aq.enterValue;

  // Update query buttons
  const addConditionBtn = document.getElementById("addConditionBtn");
  const runQueryBtn = document.getElementById("runQueryBtn");

  if (addConditionBtn) {
    const iconElement = addConditionBtn.querySelector("i");
    addConditionBtn.innerHTML = "";
    if (iconElement) addConditionBtn.appendChild(iconElement);
    addConditionBtn.appendChild(document.createTextNode(" " + aq.addCondition));
  }

  if (runQueryBtn) {
    const iconElement = runQueryBtn.querySelector("i");
    runQueryBtn.innerHTML = "";
    if (iconElement) runQueryBtn.appendChild(iconElement);
    runQueryBtn.appendChild(document.createTextNode(" " + aq.runQuery));
  }
  
  // Spatial Analysis title
  const spatialAnalysisTitle = document.querySelector(
    "#spatial-analysis-title"
  ) || document.querySelector('[id="spatial-analysis-title"]');
  
  if (spatialAnalysisTitle && t.bufferAnalysis && t.bufferAnalysis.sectionTitle) {
    const iconElement = spatialAnalysisTitle.querySelector("i");
    spatialAnalysisTitle.innerHTML = "";
    if (iconElement) spatialAnalysisTitle.appendChild(iconElement);
    spatialAnalysisTitle.appendChild(
      document.createTextNode(" " + t.bufferAnalysis.sectionTitle)
    );
  }
}

/**
 * Update info panel
 * @param {Object} t - Translation object
 */
function updateInfoPanel(t) {
  const infoPanel = document.getElementById("info-panel");
  if (!infoPanel) return;

  // Update buttons text
  const cancelChangesBtn = document.getElementById("cancel-changes");
  const saveChangesBtn = document.getElementById("save-changes");

  if (cancelChangesBtn && t.cancelChanges) {
    cancelChangesBtn.textContent = t.cancelChanges;
  }

  if (saveChangesBtn && t.saveChanges) {
    saveChangesBtn.textContent = t.saveChanges;
  }

  // Refresh panel content if it's open
  if (infoPanel.classList.contains("show")) {
    const activeTab = document.querySelector(".tab-button.active");
    if (activeTab) {
      const tabId = activeTab.getAttribute("data-tab");
      if (tabId && window.selectedNeighborhoodId) {
        if (typeof window.renderInfoPanel === "function") {
          window.renderInfoPanel(tabId, window.selectedNeighborhoodId);
        }
      }
    }
  }
}

/**
 * Initialize default language on page load
 */
function initializeDefaultLanguage() {
  // Remove saved language first to ensure default
  localStorage.removeItem("preferredLanguage");
  // Set default language
  localStorage.setItem("preferredLanguage", "ar");

  // Apply fixed styles to header and footer to prevent layout shifts
  document.querySelectorAll(".no-translate").forEach((element) => {
    element.style.direction = "rtl";

    // Make sure both titles are visible in the header
    if (element.id === "mainHeader") {
      const titleAr = element.querySelector(".title-ar");
      const titleEn = element.querySelector(".title-en");

      if (titleAr) titleAr.style.display = "block";
      if (titleEn) titleEn.style.display = "block";
    }
  });

  // Apply Arabic language
  switchLanguage("ar");

  // Update language toggle button text
  const langToggleText2 = document.getElementById("langToggleText");
  if (langToggleText2) {
    langToggleText2.textContent = "تغيير اللغة";
  }

  // Force update tab names immediately
  setTimeout(() => {
    const t = translations["ar"];
    if (t && t.tabs) {
      document.querySelectorAll(".tab-button").forEach((button) => {
        if (isInNoTranslateContainer(button)) return;

        const tabId = button.getAttribute("data-tab");
        const tabSpan = button.querySelector("span:not(.tab-close)");
        if (tabSpan && tabId && t.tabs[tabId]) {
          tabSpan.textContent = t.tabs[tabId];
        }
      });
    }
  }, 100);

  // Set page direction to RTL
  document.documentElement.dir = "rtl";
  document.documentElement.lang = "ar";
}

// إلغاء تفعيل initializeDefaultLanguage عند تحميل الصفحة
// document.addEventListener("DOMContentLoaded", initializeDefaultLanguage);

// تفعيل اختيار اللغة بناءً على preferredLanguage في localStorage
// إذا لم توجد، يتم اختيار العربية افتراضيًا

document.addEventListener("DOMContentLoaded", function () {
  const preferredLang = localStorage.getItem("preferredLanguage");
  if (preferredLang === "ar" || preferredLang === "en") {
    switchLanguage(preferredLang);
  } else {
    switchLanguage("ar");
  }
});

// Make sure window.translations is available globally
if (!window.translations) {
  window.translations = translations;
}

// Make language functions available globally
window.toggleLanguage = toggleLanguage;
window.switchLanguage = switchLanguage;
window.isInNoTranslateContainer = isInNoTranslateContainer;

function updateTitlesForLanguage(lang) {
  const t = window.translations[lang] || translations[lang];
  if (!t.titles) return;
  // Toolbar
  const toolbarTitles = [
    { id: "zoom-in-btn", key: "zoomIn" },
    { id: "zoom-out-btn", key: "zoomOut" },
    { id: "home-btn", key: "home" },
    { id: "measure-btn", key: "measure" },
    { id: "draw-btn", key: "draw" },
    { id: "printMapBtn", key: "printMap" },
    { id: "tabsToggleBtn", key: "toggleTabs" },
    { id: "toggleLeftSidebar", key: "toggleSidebar" },
    { id: "toggleRightSidebar", key: "toggleSidebarRight" }
  ];
  toolbarTitles.forEach(({ id, key }) => {
    const el = document.getElementById(id);
    if (el) el.title = t.titles[key];
  });
  // Style section
  const styleTitles = [
    { id: "layerColor", key: "layerColor" },
    { id: "layerOpacity", key: "transparency" },
    { id: "layerLineWeight", key: "lineWeight" },
    { id: "layerLineColor", key: "lineColor" },
    { id: "layerStyleSelect", key: "chooseSidebar" }
  ];
  styleTitles.forEach(({ id, key }) => {
    const el = document.getElementById(id);
    if (el) el.title = t.titles[key];
  });
  // Query builder
  const queryTitles = [
    { id: "queryTableSelect", key: "chooseQueryTable" },
    { id: "queryFieldSelect", key: "chooseQueryField" },
    { id: "queryOperatorSelect", key: "chooseQueryOperator" },
    { id: "valueListBtn", key: "valueListBtn" }
  ];
  queryTitles.forEach(({ id, key }) => {
    const el = document.getElementById(id);
    if (el) el.title = t.titles[key];
  });
  // Close buttons
  ["fullscreen-popup-close", "close-info-panel"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.title = t.titles.close;
  });
  // Back to table button
  const backBtn = document.querySelector(".back-button");
  if (backBtn) backBtn.title = t.titles.backToTable;
  // Basemap gallery
  const simpleBasemapBtn = document.getElementById("simple-basemap-button");
  if (simpleBasemapBtn) simpleBasemapBtn.title = t.titles.chooseBasemap;
  // Basemap thumbs
  const basemapThumbs = document.querySelectorAll(".basemap-thumb");
  const basemapLabels = [
    { type: "osm", key: "خريطة الشارع", en: "Street Map" },
    { type: "satellite", key: "أقمار صناعية", en: "Satellite" },
    { type: "terrain", key: "تضاريس", en: "Terrain" },
    { type: "dark", key: "داكن", en: "Dark" }
  ];
  basemapThumbs.forEach((el, i) => {
    if (t.titles && basemapLabels[i]) el.title = basemapLabels[i].key;
  });
  // Compass
  const compass = document.querySelector(".map-compass");
  if (compass) compass.title = t.titles.compassNorth;
  // Compass image alt
  const compassImg = compass ? compass.querySelector("img") : null;
  if (compassImg) compassImg.alt = t.titles.compassNorth;
}

// Call updateTitlesForLanguage in switchLanguage
const _originalSwitchLanguage = window.switchLanguage;
window.switchLanguage = function(lang) {
  _originalSwitchLanguage(lang);
  updateTitlesForLanguage(lang);
};
