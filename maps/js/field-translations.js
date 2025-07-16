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
    type: "نوع السوق",
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
    transformer_damage: "مستوى ضرر مراكز التحويل",
    line_damage: "مستوى ضرر الخطوط والاسلاك",

    // communications network
    landline_damage: "مستوى ضرر خطوط الاتصالات الأرضية",
    tower_damage: "ضرر البرج",

    // water supply & sewage network
    connected: "موصول على الشبكة",
    main_damage: "نسبة ضرر خطوط الامداد الرئيسية والفرعية",
    secondary_damage: "ضرر فرعي",
    main_status: "تشغيل رئيسي",
    secondary_status: "تشغيل فرعي",
    damage_percent: "نسبة تشغيل خطوط الامداد الرئيسية والفرعية",
    operation_percent: "نسبة التشغيل",

    // housing damage
    units_total: "تقدير العدد الكلي للوحدات السكنية",
    vacant_units: "نسبة الوحدات السكنية الفارغة سابقاً",
    severe_damage: "ضرر شديد",
    medium_damage: "ضرر متوسط",
    light_damage: "ضرر خفيف",
    undamaged_units: "وحدات سليمة",

    // urban fabric
    urban_area: "المنطقة الحضرية",
    texture_status: "المساحة العمرانية",
    informal_percent: "السكن العشوائي",
    highrise_percent: "نسبة المساكن الطابقية",
    traditional_percent: "نسبة المساكن التقليدية",
    notes: "ملاحظات",

    // population changes
    population: "عدد السكان الحالي",
    migrants: "نسبة المهاجرين",
    returnees: "نسبة العائدين",

    // neighborhood committee members
    mukhtar_name: "اسم المختار",
    members_count: "عدد الأعضاء",
    secretary_name: "اسم أمين السر",
    male_percentage: "نسبة الذكور من الأعضاء",

    // executive activities (new checkbox fields)
    donors: "الجهات الداعمة",
    partners: "الشركاء المنفذون",
  },
  en: {
    // Common fields
    id: "ID",
    neighborhood_id: "Neighborhood ID",
    status: "Status",
    needs: "Needs",

    // humanitarian interventions
    type: "Market Type",
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

    // executive activities (new checkbox fields)
    donors: "Supporting Organizations",
    partners: "Implementing Partners",
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
      إدارة_النفايات_الصلبة: "النفايات الصلبة",

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
      // Added missing tab translations (Arabic)
      خدمات_الرعاية_الصحية_والتعليم: "خدمات الرعاية الصحية والتعليم",
      تقييم_الضرر_الفيزيائي_للشوارع: "تقييم الضرر الفيزيائي للشوارع",
      الأنشطة_التنفيذية: "الأنشطة_التنفيذية",
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
      supportedFormats: "الصيغ المدعومة",
      chooseLayerExport: "اختر الطبقة للتصدير:",
      selectLayer: "-- اختر طبقة --",
      exportFormat: "صيغة التصدير:",
      // Style section
      colorByColumn: "تلوين حسب العمود:",
      selectColumn: "اختر عمود...",
      applyColoring: "تطبيق التلوين",
      colorLegend: "مفتاح الألوان:",
    },
    // Map info bar labels
    mapInfo: {
      scale: "المقياس",
      center: "المركز",
    },
    // Urban Effectiveness Calculations
    urbanEffectiveness: {
      title: "حساب الفعاليات و الوظائف القطاعية",
      sectoralFunctions: {
        title: "حساب الوظائف القطاعية الحضرية",
        description: "حساب وتحليل الوظائف القطاعية للأحياء الحضرية",
        buttonText: "فتح حاسبة الوظائف القطاعية",
      },
      abstractEffectiveness: {
        title: "الفعالية العمرانية المجردة",
        description: "حساب الفعالية المركبة باستخدام 10 مكونات قطاعية",
        buttonText: "فتح حاسبة الفعالية المجردة",
      },
      finalEffectiveness: {
        title: "الفعالية العمرانية النهائية",
        description:
          "حساب الفعالية النهائية من مكونين: التغيرات السكانية + الفعالية المجردة",
        buttonText: "فتح حاسبة الفعالية النهائية",
      },
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
      // Query results section
      queryResults: "نتائج الاستعلام",
      emptyState: "قم بإنشاء استعلام وتنفيذه لعرض النتائج",
      // Spatial analysis section
      spatialAnalysis: "التحليل المكاني",
      bufferAnalysis: "تحليل النطاق",
      radiusLabel: "نصف القطر (بالكيلومتر):",
      selectCenterBtn: "1. تحديد المركز على الخريطة",
      runAnalysisBtn: "2. حساب تقرير النطاق",
      cancelAnalysisBtn: "إلغاء الحساب",
      // Urban effectiveness section
      urbanEffectiveness: "حساب الفعاليات و الوظائف القطاعية",
      sectoralFunctions: "حساب الوظائف القطاعية الحضرية",
      sectoralFunctionsDesc: "حساب وتحليل الوظائف القطاعية للأحياء الحضرية",
      sectoralFunctionsBtn: "فتح حاسبة الوظائف القطاعية",
      abstractEffectiveness: "الفعالية العمرانية المجردة",
      abstractEffectivenessDesc: "حساب الفعالية المركبة باستخدام 10 مكونات قطاعية",
      abstractEffectivenessBtn: "فتح حاسبة الفعالية المجردة",
      finalEffectiveness: "الفعالية العمرانية النهائية",
      finalEffectivenessDesc: "حساب الفعالية النهائية من مكونين: التغيرات السكانية + الفعالية المجردة",
      finalEffectivenessBtn: "فتح حاسبة الفعالية النهائية",
      resetNeighborhoods: "إعادة ضبط طبقة الأحياء",
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
  },
  en: {
    title: "Urban Management System for Aleppo",
    settingsText: "Settings",
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
      إدارة_النفايات_الصلبة: "Solid Waste",

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
      // Added missing tab translations
      خدمات_الرعاية_الصحية_والتعليم: "Health & Education Services",
      تقييم_الضرر_الفيزيائي_للشوارع: "Street Physical Damage Assessment",
      الأنشطة_التنفيذية: "Executive Activities",
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
      supportedFormats: "Supported Formats",
      chooseLayerExport: "Choose layer to export:",
      selectLayer: "-- Select Layer --",
      exportFormat: "Export Format:",
      // Style section
      colorByColumn: "Color by Column:",
      selectColumn: "Select Column...",
      applyColoring: "Apply Coloring",
      colorLegend: "Color Legend:",
    },
    // Map info bar labels
    mapInfo: {
      scale: "Scale",
      center: "Center",
    },
    // Urban Effectiveness Calculations
    urbanEffectiveness: {
      title: "Effectiveness and Sectoral Functions Calculation",
      sectoralFunctions: {
        title: "Urban Sectoral Functions Calculation",
        description:
          "Calculate and analyze sectoral functions for urban neighborhoods",
        buttonText: "Open Sectoral Functions Calculator",
      },
      abstractEffectiveness: {
        title: "Abstract Urban Effectiveness",
        description:
          "Calculate composite effectiveness using 10 sectoral components",
        buttonText: "Open Abstract Effectiveness Calculator",
      },
      finalEffectiveness: {
        title: "Final Urban Effectiveness",
        description:
          "Calculate final effectiveness from two components: Population Changes + Abstract Effectiveness",
        buttonText: "Open Final Effectiveness Calculator",
      },
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
      // Query results section
      queryResults: "Query Results",
      emptyState: "Create and run a query to view results",
      // Spatial analysis section
      spatialAnalysis: "Spatial Analysis",
      bufferAnalysis: "Buffer Analysis",
      radiusLabel: "Radius (in kilometers):",
      selectCenterBtn: "1. Select Center on Map",
      runAnalysisBtn: "2. Calculate Buffer Report",
      cancelAnalysisBtn: "Cancel Analysis",
      // Urban effectiveness section
      urbanEffectiveness: "Effectiveness and Sectoral Functions Calculation",
      sectoralFunctions: "Urban Sectoral Functions Calculation",
      sectoralFunctionsDesc: "Calculate and analyze sectoral functions for urban neighborhoods",
      sectoralFunctionsBtn: "Open Sectoral Functions Calculator",
      abstractEffectiveness: "Abstract Urban Effectiveness",
      abstractEffectivenessDesc: "Calculate composite effectiveness using 10 sectoral components",
      abstractEffectivenessBtn: "Open Abstract Effectiveness Calculator",
      finalEffectiveness: "Final Urban Effectiveness",
      finalEffectivenessDesc: "Calculate final effectiveness from two components: Population Changes + Abstract Effectiveness",
      finalEffectivenessBtn: "Open Final Effectiveness Calculator",
      resetNeighborhoods: "Reset Neighborhoods Layer",
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
  },
};

// Make translations available globally
window.translations = translations;
console.log("Translations made available globally:", {
  hasTranslations: !!window.translations,
  hasArabic: !!window.translations?.ar,
  hasEnglish: !!window.translations?.en,
  hasAnalysisQueries: !!window.translations?.ar?.analysisQueries
});

/**
 * Toggle language between Arabic and English
 */
function toggleLanguage() {
  // switch language between arabic and english
  const currentLang = document.documentElement.lang || "ar";
  const newLang = currentLang === "ar" ? "en" : "ar";
  console.log("Toggling language from", currentLang, "to", newLang);
  switchLanguage(newLang);

  // update language toggle button text
  const langToggleText = document.getElementById("langToggleText");
  if (langToggleText) {
    langToggleText.textContent = newLang === "ar" ? "تغيير اللغة" : "Change Language";
    console.log("Updated language toggle button text to:", langToggleText.textContent);
  } else {
    console.warn("Language toggle button text element not found");
  }

  // save selected language in local storage using preferredLanguage key
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
  const t = window.translations[lang];
  console.log("Translation object for language", lang, ":", t);
  if (!t) {
    console.error("No translations found for language:", lang);
    return;
  }
  //document.title = t.title;

  // Skip translation for elements with no-translate class
  const noTranslateElements = document.querySelectorAll(".no-translate");

  // update menu - only if not in a no-translate container
  const settingsText = document.getElementById("settingsText");
  const logoutText = document.getElementById("logoutText");

  // Update header menu items (span inside the anchor)
  const settingsBtn = document.getElementById("settingsBtn");
  if (settingsBtn) {
    const span = settingsBtn.querySelector("span");
    if (span && t.settingsText) span.textContent = t.settingsText;
  }
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    const span = logoutBtn.querySelector("span");
    if (span && t.logoutText) span.textContent = t.logoutText;
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
  console.log("Starting UI updates for language:", lang);
  updateSidebarElements(t);
  updateUrbanEffectivenessSection(t);
  updateAnalysisQueriesSection(t);
  updateInfoPanel(t);
  console.log("Completed UI updates for language:", lang);

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

  // Left sidebar title
  const layersManagementTitle = document.querySelector(
    "#leftSidebar .sidebar-header h3"
  );
  if (
    layersManagementTitle &&
    !isInNoTranslateContainer(layersManagementTitle)
  ) {
    layersManagementTitle.classList.add("language-transition");
    setTimeout(() => {
      layersManagementTitle.textContent = t.sidebar.layersManagement;
      layersManagementTitle.classList.remove("language-transition");
    }, 150);
  }

  // Main Layers
  const mainLayersGroupName = document.querySelector('[data-layer-group="main-layers"] .layer-group-name');
  if (mainLayersGroupName) mainLayersGroupName.textContent = t.sidebar.mainLayers;

  // Neighborhoods
  const neighborhoodsGroupName = document.querySelector('[data-layer-group="neighborhoods"] .layer-group-name');
  if (neighborhoodsGroupName) neighborhoodsGroupName.textContent = t.sidebar.neighborhoods;

  // Service Sectors
  const serviceGroupName = document.querySelector('[data-layer-group="service-sectors"] .layer-group-name');
  if (serviceGroupName) serviceGroupName.textContent = t.sidebar.serviceSectors;

  // Neighborhood Boundaries
  const neighborhoodsBoundariesLayer = document.querySelector('[data-layer="neighborhoods-polygons"] .layer-name');
  if (neighborhoodsBoundariesLayer) neighborhoodsBoundariesLayer.textContent = t.sidebar.neighborhoodsBoundaries;

  // Neighborhood Labels
  const neighborhoodsLabelsLayer = document.querySelector('[data-layer="neighborhoods-labels"] .layer-name');
  if (neighborhoodsLabelsLayer) neighborhoodsLabelsLayer.textContent = t.sidebar.neighborhoodsLabels;

  // Service Sectors Boundaries
  const serviceSectorsBoundariesLayer = document.querySelector('[data-layer="service-sectors-polygons"] .layer-name');
  if (serviceSectorsBoundariesLayer) serviceSectorsBoundariesLayer.textContent = t.sidebar.serviceSectorsBoundaries;

  // Service Sectors Labels
  const serviceSectorsLabelsLayer = document.querySelector('[data-layer="service-sectors-labels"] .layer-name');
  if (serviceSectorsLabelsLayer) serviceSectorsLabelsLayer.textContent = t.sidebar.serviceSectorsLabels;

  // Data Management
  const importExportTitle = document.querySelector('.import-export-header h4');
  if (importExportTitle) importExportTitle.textContent = t.sidebar.dataManagement;

  // Import Data
  const importDataTitle = document.querySelector('.data-operation-group h5:first-of-type');
  if (importDataTitle) importDataTitle.textContent = t.sidebar.importData;

  // Import File
  const importLayerBtn = document.getElementById('importLayerBtn');
  if (importLayerBtn) {
    const span = importLayerBtn.querySelector('span');
    if (span) span.textContent = t.sidebar.importLayer;
  }

  // Export Data
  const exportDataTitle = document.querySelector('.data-operation-group:nth-child(2) h5');
  if (exportDataTitle) exportDataTitle.textContent = t.sidebar.exportData;

  // Export Layer
  const exportLayerBtn = document.getElementById('exportLayerBtn');
  if (exportLayerBtn) {
    const span = exportLayerBtn.querySelector('span');
    if (span) span.textContent = t.sidebar.exportLayer;
  }

  // Export Format
  const exportFormatLabel = document.querySelector('label[for="exportFormat"]');
  if (exportFormatLabel) exportFormatLabel.textContent = t.sidebar.exportFormat;

  // Symbols and Colors
  const symbolsColorsTitle = document.querySelector('.sidebar-section:last-child h4');
  if (symbolsColorsTitle) symbolsColorsTitle.textContent = t.sidebar.symbolsColors;

  // Color
  const colorLabel = document.getElementById('colorLabel');
  if (colorLabel) colorLabel.textContent = t.sidebar.color;

  // Transparency
  const opacityLabel = document.getElementById('opacityLabel');
  if (opacityLabel) opacityLabel.textContent = t.sidebar.transparency;

  // Line Weight
  const lineWeightLabel = document.getElementById('lineWeightLabel');
  if (lineWeightLabel) lineWeightLabel.textContent = t.sidebar.lineWeight;

  // Update tooltips
  document.querySelectorAll('[title="تكبير للطبقات"]').forEach((el) => {
    el.title = t.sidebar.zoomToLayers;
  });

  document.querySelectorAll('[title="تكبير للطبقة"]').forEach((el) => {
    el.title = t.sidebar.zoomToLayer;
  });

  document.querySelectorAll('[title="خصائص المجموعة"]').forEach((el) => {
    el.title = t.sidebar.groupProperties;
  });

  document.querySelectorAll('[title="خصائص الطبقة"]').forEach((el) => {
    el.title = t.sidebar.layerProperties;
  });
}

/**
 * Update layer management section
 * @param {Object} t - Translation object
 */
function updateLayerManagementSection(t) {
  // Layer groups
  const mainLayersGroupName = document.querySelector(
    '[data-layer-group="main-layers"] .layer-group-name'
  );
  if (mainLayersGroupName) {
    mainLayersGroupName.textContent = t.sidebar.mainLayers;
  }

  const neighborhoodsGroupName = document.querySelector(
    '[data-layer-group="neighborhoods"] .layer-group-name'
  );
  if (neighborhoodsGroupName) {
    neighborhoodsGroupName.textContent = t.sidebar.neighborhoods;
  }

  const serviceGroupName = document.querySelector(
    '[data-layer-group="service-sectors"] .layer-group-name'
  );
  if (serviceGroupName) {
    serviceGroupName.textContent = t.sidebar.serviceSectors;
  }

  // Layer names
  const neighborhoodsBoundariesLayer = document.querySelector(
    '[data-layer="neighborhoods-polygons"] .layer-name'
  );
  if (neighborhoodsBoundariesLayer) {
    neighborhoodsBoundariesLayer.textContent =
      t.sidebar.neighborhoodsBoundaries;
  }

  const neighborhoodsLabelsLayer = document.querySelector(
    '[data-layer="neighborhoods-labels"] .layer-name'
  );
  if (neighborhoodsLabelsLayer) {
    neighborhoodsLabelsLayer.textContent = t.sidebar.neighborhoodsLabels;
  }

  const serviceSectorsBoundariesLayer = document.querySelector(
    '[data-layer="service-sectors-polygons"] .layer-name'
  );
  if (serviceSectorsBoundariesLayer) {
    serviceSectorsBoundariesLayer.textContent =
      t.sidebar.serviceSectorsBoundaries;
  }

  const serviceSectorsLabelsLayer = document.querySelector(
    '[data-layer="service-sectors-labels"] .layer-name'
  );
  if (serviceSectorsLabelsLayer) {
    serviceSectorsLabelsLayer.textContent = t.sidebar.serviceSectorsLabels;
  }

  // Update tooltips
  document.querySelectorAll('[title="تكبير للطبقات"]').forEach((el) => {
    el.title = t.sidebar.zoomToLayers;
  });

  document.querySelectorAll('[title="تكبير للطبقة"]').forEach((el) => {
    el.title = t.sidebar.zoomToLayer;
  });

  document.querySelectorAll('[title="خصائص المجموعة"]').forEach((el) => {
    el.title = t.sidebar.groupProperties;
  });

  document.querySelectorAll('[title="خصائص الطبقة"]').forEach((el) => {
    el.title = t.sidebar.layerProperties;
  });
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

  // Update buttons
  const importLayerBtn = document.getElementById("importLayerBtn");
  if (importLayerBtn) {
    const spanElement = importLayerBtn.querySelector("span");
    if (spanElement) {
      spanElement.textContent = t.sidebar.importLayer;
    }
  }

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
  const applyStyleBtn = document.getElementById("applyStyleBtn");
  const resetStyleBtn = document.getElementById("resetStyleBtn");

  if (colorLabel) colorLabel.textContent = t.sidebar.color;
  if (opacityLabel) opacityLabel.textContent = t.sidebar.transparency;
  if (lineWeightLabel) lineWeightLabel.textContent = t.sidebar.lineWeight;

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
  console.log("updateAnalysisQueriesSection called with:", t);
  
  if (!t.analysisQueries) {
    console.warn("No analysisQueries translations found");
    return;
  }

  const aq = t.analysisQueries;
  console.log("Analysis queries translations:", aq);

  // Right sidebar title
  const rightSidebarTitle = document.querySelector(
    "#rightSidebar .sidebar-header h3"
  );
  console.log("Right sidebar title element:", rightSidebarTitle);
  if (rightSidebarTitle) {
    rightSidebarTitle.classList.add("language-transition");
    setTimeout(() => {
      rightSidebarTitle.textContent = aq.title;
      rightSidebarTitle.classList.remove("language-transition");
      console.log("Updated right sidebar title to:", aq.title);
    }, 150);
  } else {
    console.warn("Right sidebar title element not found");
  }

  // Query builder title
  const queryBuilderTitle = document.querySelector(
    "#rightSidebar .sidebar-section:nth-child(2) h4"
  );
  console.log("Query builder title element:", queryBuilderTitle);
  if (queryBuilderTitle) {
    queryBuilderTitle.textContent = aq.queryBuilder;
    console.log("Updated query builder title to:", aq.queryBuilder);
  } else {
    console.warn("Query builder title element not found");
  }

  // Update query controls
  const queryTableSelect = document.getElementById("queryTableSelect");
  const queryFieldSelect = document.getElementById("queryFieldSelect");
  const queryOperatorSelect = document.getElementById("queryOperatorSelect");
  const queryValueInput = document.getElementById("queryValueInput");

  console.log("Query controls found:", {
    queryTableSelect: !!queryTableSelect,
    queryFieldSelect: !!queryFieldSelect,
    queryOperatorSelect: !!queryOperatorSelect,
    queryValueInput: !!queryValueInput
  });

  if (queryTableSelect) {
    const firstOption = queryTableSelect.querySelector("option[value='']");
    if (firstOption) {
      firstOption.textContent = aq.chooseLayer;
      console.log("Updated query table select to:", aq.chooseLayer);
    }
  }

  if (queryFieldSelect) {
    const firstOption = queryFieldSelect.querySelector("option[value='']");
    if (firstOption) {
      firstOption.textContent = aq.chooseField;
      console.log("Updated query field select to:", aq.chooseField);
    }
  }

  if (queryOperatorSelect) {
    const firstOption = queryOperatorSelect.querySelector("option[value='']");
    if (firstOption) {
      firstOption.textContent = aq.chooseOperation;
      console.log("Updated query operator select to:", aq.chooseOperation);
    }
  }

  if (queryValueInput) {
    queryValueInput.placeholder = aq.enterValue;
    console.log("Updated query value input placeholder to:", aq.enterValue);
  }

  // Update query buttons
  const addConditionBtn = document.getElementById("addConditionBtn");
  const runQueryBtn = document.getElementById("runQueryBtn");

  console.log("Query buttons found:", {
    addConditionBtn: !!addConditionBtn,
    runQueryBtn: !!runQueryBtn
  });

  if (addConditionBtn) {
    const iconElement = addConditionBtn.querySelector("i");
    addConditionBtn.innerHTML = "";
    if (iconElement) addConditionBtn.appendChild(iconElement);
    addConditionBtn.appendChild(document.createTextNode(" " + aq.addCondition));
    console.log("Updated add condition button to:", aq.addCondition);
  }

  if (runQueryBtn) {
    const iconElement = runQueryBtn.querySelector("i");
    runQueryBtn.innerHTML = "";
    if (iconElement) runQueryBtn.appendChild(iconElement);
    runQueryBtn.appendChild(document.createTextNode(" " + aq.runQuery));
    console.log("Updated run query button to:", aq.runQuery);
  }

  // Update query results section
  const queryResultsTitle = document.querySelector("#queryResults .empty-state");
  console.log("Query results title element:", queryResultsTitle);
  if (queryResultsTitle) {
    queryResultsTitle.textContent = aq.emptyState;
    console.log("Updated query results title to:", aq.emptyState);
  } else {
    console.warn("Query results title element not found");
  }

  // Update spatial analysis section
  const spatialAnalysisTitle = document.getElementById("spatial-analysis-title");
  console.log("Spatial analysis title element:", spatialAnalysisTitle);
  if (spatialAnalysisTitle) {
    const iconElement = spatialAnalysisTitle.querySelector("i");
    spatialAnalysisTitle.innerHTML = "";
    if (iconElement) spatialAnalysisTitle.appendChild(iconElement);
    spatialAnalysisTitle.appendChild(document.createTextNode(" " + aq.spatialAnalysis));
    console.log("Updated spatial analysis title to:", aq.spatialAnalysis);
  } else {
    console.warn("Spatial analysis title element not found");
  }

  // Update buffer analysis elements
  const bufferRadiusLabel = document.getElementById("buffer-radius-label");
  const selectCenterBtnText = document.getElementById("select-center-btn-text");
  const runAnalysisBtnText = document.getElementById("run-analysis-btn-text");
  const cancelAnalysisBtnText = document.getElementById("cancel-analysis-btn-text");

  console.log("Buffer analysis elements found:", {
    bufferRadiusLabel: !!bufferRadiusLabel,
    selectCenterBtnText: !!selectCenterBtnText,
    runAnalysisBtnText: !!runAnalysisBtnText,
    cancelAnalysisBtnText: !!cancelAnalysisBtnText
  });

  if (bufferRadiusLabel) {
    bufferRadiusLabel.textContent = aq.radiusLabel;
    console.log("Updated buffer radius label to:", aq.radiusLabel);
  }

  if (selectCenterBtnText) {
    selectCenterBtnText.textContent = aq.selectCenterBtn;
    console.log("Updated select center button text to:", aq.selectCenterBtn);
  }

  if (runAnalysisBtnText) {
    runAnalysisBtnText.textContent = aq.runAnalysisBtn;
    console.log("Updated run analysis button text to:", aq.runAnalysisBtn);
  }

  if (cancelAnalysisBtnText) {
    cancelAnalysisBtnText.textContent = aq.cancelAnalysisBtn;
    console.log("Updated cancel analysis button text to:", aq.cancelAnalysisBtn);
  }

  // Update urban effectiveness section
  const urbanEffectivenessTitle = document.getElementById("urban-effectiveness-title");
  console.log("Urban effectiveness title element:", urbanEffectivenessTitle);
  if (urbanEffectivenessTitle) {
    const iconElement = urbanEffectivenessTitle.querySelector("i");
    urbanEffectivenessTitle.innerHTML = "";
    if (iconElement) urbanEffectivenessTitle.appendChild(iconElement);
    urbanEffectivenessTitle.appendChild(document.createTextNode(" " + aq.urbanEffectiveness));
    console.log("Updated urban effectiveness title to:", aq.urbanEffectiveness);
  } else {
    console.warn("Urban effectiveness title element not found");
  }

  // Update sectoral functions subsection
  const sectoralFunctionsTitle = document.getElementById("sectoral-functions-title");
  const sectoralFunctionsDescription = document.getElementById("sectoral-functions-description");
  const sectoralFunctionsButtonText = document.getElementById("sectoral-functions-button-text");

  console.log("Sectoral functions elements found:", {
    sectoralFunctionsTitle: !!sectoralFunctionsTitle,
    sectoralFunctionsDescription: !!sectoralFunctionsDescription,
    sectoralFunctionsButtonText: !!sectoralFunctionsButtonText
  });

  if (sectoralFunctionsTitle) {
    const iconElement = sectoralFunctionsTitle.querySelector("i");
    sectoralFunctionsTitle.innerHTML = "";
    if (iconElement) sectoralFunctionsTitle.appendChild(iconElement);
    sectoralFunctionsTitle.appendChild(document.createTextNode(" " + aq.sectoralFunctions));
    console.log("Updated sectoral functions title to:", aq.sectoralFunctions);
  }

  if (sectoralFunctionsDescription) {
    sectoralFunctionsDescription.textContent = aq.sectoralFunctionsDesc;
    console.log("Updated sectoral functions description to:", aq.sectoralFunctionsDesc);
  }

  if (sectoralFunctionsButtonText) {
    sectoralFunctionsButtonText.textContent = aq.sectoralFunctionsBtn;
    console.log("Updated sectoral functions button text to:", aq.sectoralFunctionsBtn);
  }

  // Update abstract effectiveness subsection
  const abstractEffectivenessTitle = document.getElementById("abstract-effectiveness-title");
  const abstractEffectivenessDescription = document.getElementById("abstract-effectiveness-description");
  const abstractEffectivenessButtonText = document.getElementById("abstract-effectiveness-button-text");

  console.log("Abstract effectiveness elements found:", {
    abstractEffectivenessTitle: !!abstractEffectivenessTitle,
    abstractEffectivenessDescription: !!abstractEffectivenessDescription,
    abstractEffectivenessButtonText: !!abstractEffectivenessButtonText
  });

  if (abstractEffectivenessTitle) {
    const iconElement = abstractEffectivenessTitle.querySelector("i");
    abstractEffectivenessTitle.innerHTML = "";
    if (iconElement) abstractEffectivenessTitle.appendChild(iconElement);
    abstractEffectivenessTitle.appendChild(document.createTextNode(" " + aq.abstractEffectiveness));
    console.log("Updated abstract effectiveness title to:", aq.abstractEffectiveness);
  }

  if (abstractEffectivenessDescription) {
    abstractEffectivenessDescription.textContent = aq.abstractEffectivenessDesc;
    console.log("Updated abstract effectiveness description to:", aq.abstractEffectivenessDesc);
  }

  if (abstractEffectivenessButtonText) {
    abstractEffectivenessButtonText.textContent = aq.abstractEffectivenessBtn;
    console.log("Updated abstract effectiveness button text to:", aq.abstractEffectivenessBtn);
  }

  // Update final effectiveness subsection
  const finalEffectivenessTitle = document.getElementById("final-effectiveness-title");
  const finalEffectivenessDescription = document.getElementById("final-effectiveness-description");
  const finalEffectivenessButtonText = document.getElementById("final-effectiveness-button-text");

  console.log("Final effectiveness elements found:", {
    finalEffectivenessTitle: !!finalEffectivenessTitle,
    finalEffectivenessDescription: !!finalEffectivenessDescription,
    finalEffectivenessButtonText: !!finalEffectivenessButtonText
  });

  if (finalEffectivenessTitle) {
    const iconElement = finalEffectivenessTitle.querySelector("i");
    finalEffectivenessTitle.innerHTML = "";
    if (iconElement) finalEffectivenessTitle.appendChild(iconElement);
    finalEffectivenessTitle.appendChild(document.createTextNode(" " + aq.finalEffectiveness));
    console.log("Updated final effectiveness title to:", aq.finalEffectiveness);
  }

  if (finalEffectivenessDescription) {
    finalEffectivenessDescription.textContent = aq.finalEffectivenessDesc;
    console.log("Updated final effectiveness description to:", aq.finalEffectivenessDesc);
  }

  if (finalEffectivenessButtonText) {
    finalEffectivenessButtonText.textContent = aq.finalEffectivenessBtn;
    console.log("Updated final effectiveness button text to:", aq.finalEffectivenessBtn);
  }

  // Update reset button
  const resetAnalysisButtonText = document.getElementById("reset-analysis-button-text");
  console.log("Reset analysis button text element:", resetAnalysisButtonText);
  if (resetAnalysisButtonText) {
    resetAnalysisButtonText.textContent = aq.resetNeighborhoods;
    console.log("Updated reset analysis button text to:", aq.resetNeighborhoods);
  } else {
    console.warn("Reset analysis button text element not found");
  }

  // Update auto-close indicators
  const leftAutoCloseMessage = document.getElementById("left-auto-close-message");
  const rightAutoCloseMessage = document.getElementById("auto-close-message");
  
  console.log("Auto-close message elements found:", {
    leftAutoCloseMessage: !!leftAutoCloseMessage,
    rightAutoCloseMessage: !!rightAutoCloseMessage
  });
  
  if (leftAutoCloseMessage) {
    leftAutoCloseMessage.textContent = aq.autoCloseMessage;
    console.log("Updated left auto-close message to:", aq.autoCloseMessage);
  }
  
  if (rightAutoCloseMessage) {
    rightAutoCloseMessage.textContent = aq.autoCloseMessage;
    console.log("Updated right auto-close message to:", aq.autoCloseMessage);
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
  console.log("Initializing default language...");
  
  // Get saved language preference from localStorage
  let savedLanguage;
  try {
    savedLanguage = localStorage.getItem("preferredLanguage");
  } catch (error) {
    console.error("Error retrieving language preference:", error);
    savedLanguage = null;
  }

  // Set initial language based on saved preference or default to Arabic
  const initialLang = savedLanguage === "ar" || savedLanguage === "en" ? savedLanguage : "ar";
  
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

  // Apply the initial language
  console.log("Applying initial language:", initialLang);
  switchLanguage(initialLang);

  // Update language toggle button text
  const langToggleText2 = document.getElementById("langToggleText");
  if (langToggleText2) {
    langToggleText2.textContent = initialLang === "ar" ? "تغيير اللغة" : "Change Language";
    console.log("Set initial language toggle button text to:", langToggleText2.textContent);
  } else {
    console.warn("Language toggle button text element not found during initialization");
  }

  // Set page direction based on language
  document.documentElement.dir = initialLang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = initialLang;
}

// Initialize language system when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded, initializing language system...");
  initializeDefaultLanguage();
});

// Make language functions available globally
window.toggleLanguage = toggleLanguage;
window.switchLanguage = switchLanguage;
window.isInNoTranslateContainer = isInNoTranslateContainer;
console.log("Language functions made available globally:", {
  toggleLanguage: typeof toggleLanguage,
  switchLanguage: typeof switchLanguage,
  isInNoTranslateContainer: typeof isInNoTranslateContainer
});
