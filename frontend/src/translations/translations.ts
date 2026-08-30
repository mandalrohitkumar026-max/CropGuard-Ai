import { SupportedLanguage } from '../types';

export interface TranslationSchema {
  appName: string;
  tagline: string;
  nav: {
    home: string;
    analyze: string;
    crops: string;
    resources: string;
    history: string;
    dashboard: string;
    settings: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    liveStatsLabel: string;
    accuracyRate: string;
    accuracyLabel: string;
    cropsLabel: string;
    instantLabel: string;
  };
  analyze: {
    title: string;
    subtitle: string;
    dropzoneTitle: string;
    dropzoneSubtitle: string;
    browseButton: string;
    cameraButton: string;
    cropSelectLabel: string;
    autoDetect: string;
    analyzeBtn: string;
    tryDemoTitle: string;
    tryDemoDesc: string;
    scanningTitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  results: {
    title: string;
    detectedDisease: string;
    crop: string;
    confidence: string;
    severity: string;
    pathogen: string;
    symptomsTitle: string;
    possibleCauses: string;
    tabs: {
      immediate: string;
      organic: string;
      chemical: string;
      prevention: string;
      expert: string;
    };
    audioRead: string;
    printReport: string;
    saveReport: string;
    findNearbyHelp: string;
    disclaimerTitle: string;
  };
  severity: {
    healthy: string;
    mild: string;
    moderate: string;
    severe: string;
  };
  resources: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterKvk: string;
    filterAgriOffice: string;
    filterFertilizer: string;
    filterClinics: string;
    filterSchemes: string;
    callButton: string;
    directionsButton: string;
    distanceAway: string;
    useLocationBtn: string;
    locationActive: string;
  };
  crops: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    commonDiseases: string;
    season: string;
    soil: string;
    temperature: string;
    viewGuide: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    totalScans: string;
    healthyCrops: string;
    diseasesFound: string;
    highRiskAlerts: string;
    recentScans: string;
    cropHealthRate: string;
    weatherAdvisory: string;
  };
  history: {
    title: string;
    subtitle: string;
    noReports: string;
    filterCrop: string;
    filterSeverity: string;
    viewDetails: string;
    delete: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationSchema> = {
  en: {
    appName: 'CropGuard AI',
    tagline: 'Smart Crop Disease Detection',
    nav: {
      home: 'Home',
      analyze: 'Analyze Crop',
      crops: 'Crop Library',
      resources: 'Nearby Resources',
      history: 'Scan History',
      dashboard: 'Dashboard',
      settings: 'Settings'
    },
    hero: {
      badge: 'AI Powered Crop Health Intelligence',
      headline: 'Detect Crop Diseases Before They Spread.',
      subheadline:
        'Upload a crop-leaf photo and get AI-powered disease insights, prevention guidance, and nearby agricultural support in seconds.',
      primaryCta: 'Analyze Crop',
      secondaryCta: 'Explore How It Works',
      liveStatsLabel: 'Field-Tested Diagnostics',
      accuracyRate: '98.4%',
      accuracyLabel: 'Diagnostic Accuracy',
      cropsLabel: 'Supported Crops',
      instantLabel: 'Instant AI Insights'
    },
    analyze: {
      title: 'Crop Leaf Disease Scanner',
      subtitle: 'Upload a clear photo of an infected or healthy leaf to diagnose plant pathology.',
      dropzoneTitle: 'Drag & Drop your crop leaf image here',
      dropzoneSubtitle: 'or click to browse files (JPG, PNG, WebP up to 10MB)',
      browseButton: 'Choose Leaf Image',
      cameraButton: 'Capture with Camera',
      cropSelectLabel: 'Select Crop Type (Optional):',
      autoDetect: 'Auto-Detect Crop Species',
      analyzeBtn: 'Run AI Disease Analysis',
      tryDemoTitle: 'Or test instantly with verified field samples:',
      tryDemoDesc: 'Click any sample below to preview instant diagnostic scanning.',
      scanningTitle: 'Analyzing Leaf Pathology...',
      step1: '1. Preprocessing image & leaf edge segmentation',
      step2: '2. Extracting chlorosis and lesion features',
      step3: '3. Vision Transformer neural classification',
      step4: '4. Compiling organic & chemical treatment remedies'
    },
    results: {
      title: 'Crop Diagnostic & Treatment Report',
      detectedDisease: 'Identified Disease',
      crop: 'Crop Variety',
      confidence: 'AI Confidence Score',
      severity: 'Disease Severity',
      pathogen: 'Pathogen Classification',
      symptomsTitle: 'Visual Symptoms Detected on Leaf',
      possibleCauses: 'Underlying Environmental Causes',
      tabs: {
        immediate: 'Immediate Actions',
        organic: 'Organic & Biological Treatment',
        chemical: 'Chemical Control & Dosages',
        prevention: 'Long-term Agronomy',
        expert: 'Expert Consultation'
      },
      audioRead: 'Listen to Voice Diagnosis (Audio)',
      printReport: 'Download / Print PDF Report',
      saveReport: 'Saved to Farm Records',
      findNearbyHelp: 'Locate Nearby KVK & Agri Centers',
      disclaimerTitle: 'Agricultural Advisory Disclaimer'
    },
    severity: {
      healthy: 'Healthy Crop',
      mild: 'Mild Infestation',
      moderate: 'Moderate Blight',
      severe: 'Severe Infection (High Risk)'
    },
    resources: {
      title: 'Nearby Agricultural Resources & Support',
      subtitle: 'Locate Krishi Vigyan Kendras (KVK), Govt Agri Offices, certified fertilizer stores, and expert clinics near your farm.',
      filterAll: 'All Resources',
      filterKvk: 'Krishi Vigyan Kendras (KVK)',
      filterAgriOffice: 'Govt Agriculture Offices',
      filterFertilizer: 'Certified Fertilizer Stores',
      filterClinics: 'Expert Plant Clinics',
      filterSchemes: 'Government Schemes & Subsidies',
      callButton: 'Call Officer',
      directionsButton: 'Get Directions',
      distanceAway: 'away from your location',
      useLocationBtn: 'Use My Farm GPS Location',
      locationActive: 'GPS Location Active'
    },
    crops: {
      title: 'Crop Knowledge & Disease Encyclopedia',
      subtitle: 'Comprehensive agronomy guides, symptom identification keys, and treatment manuals for major crops.',
      searchPlaceholder: 'Search crops or diseases (e.g. Tomato, Early Blight, Rice Blast)...',
      commonDiseases: 'Common Diseases',
      season: 'Ideal Season',
      soil: 'Soil Type',
      temperature: 'Optimal Temp',
      viewGuide: 'View Crop Guide'
    },
    dashboard: {
      title: 'Farmer Health Dashboard',
      subtitle: 'Overview of all farm diagnostic scans, disease risks, and crop vitality records.',
      totalScans: 'Total Scans',
      healthyCrops: 'Healthy Scans',
      diseasesFound: 'Diseases Detected',
      highRiskAlerts: 'High Risk Alerts',
      recentScans: 'Recent Field Diagnostics',
      cropHealthRate: 'Crop Health Index',
      weatherAdvisory: 'Regional Agro-Weather Alert'
    },
    history: {
      title: 'Diagnostic Scan History',
      subtitle: 'Archive of all leaf analyses, treatments applied, and progress records.',
      noReports: 'No scan history found yet. Upload a leaf image to generate your first diagnostic report.',
      filterCrop: 'Filter by Crop',
      filterSeverity: 'Filter by Severity',
      viewDetails: 'View Full Report',
      delete: 'Delete'
    }
  },
  hi: {
    appName: 'क्रॉपगार्ड AI',
    tagline: 'स्मार्ट फसल रोग पहचान एवं उपचार',
    nav: {
      home: 'होम',
      analyze: 'फसल जांचें',
      crops: 'फसल लाइब्रेरी',
      resources: 'निकटतम केंद्र',
      history: 'जांच इतिहास',
      dashboard: 'डैशबोर्ड',
      settings: 'सेटिंग्स'
    },
    hero: {
      badge: 'AI आधारित स्मार्ट कृषि सुरक्षा',
      headline: 'फैलने से पहले फसल के रोगों को पहचानें।',
      subheadline:
        'पत्ती की फोटो अपलोड करें और सेकंडों में AI रोग पहचान, रोकथाम सलाह और निकटतम कृषि सहायता पाएं।',
      primaryCta: 'फसल की जांच करें',
      secondaryCta: 'यह कैसे काम करता है',
      liveStatsLabel: 'सत्यापित कृषि डायग्नोस्टिक्स',
      accuracyRate: '98.4%',
      accuracyLabel: 'सटीक पहचान दर',
      cropsLabel: 'प्रमुख फसलें समर्थित',
      instantLabel: 'तत्काल AI सलाह'
    },
    analyze: {
      title: 'पत्ती रोग AI स्कैनर',
      subtitle: 'रोग की पहचान और दवा जानने के लिए प्रभावित पत्ती की साफ तस्वीर अपलोड करें।',
      dropzoneTitle: 'यहां पत्ती की फोटो खींचें या छोड़ें',
      dropzoneSubtitle: 'या फोन/कंप्यूटर से फोटो चुनें (JPG, PNG, WebP 10MB तक)',
      browseButton: 'फोटो चुनें',
      cameraButton: 'कैमरे से फोटो लें',
      cropSelectLabel: 'फसल चुनें (वैकल्पिक):',
      autoDetect: 'ऑटो-डिटेक्ट फसल',
      analyzeBtn: 'AI रोग जांच शुरू करें',
      tryDemoTitle: 'या तुरंत नमूना पत्तियों से परीक्षण करें:',
      tryDemoDesc: 'नीचे दिए गए किसी भी नमूने पर क्लिक करके तुरंत जांच देखें।',
      scanningTitle: 'पत्ती का AI विश्लेषण जारी है...',
      step1: '1. पत्ती की छवि और किनारों की पहचान',
      step2: '2. पत्तों पर धब्बे और फंगस के लक्षणों की जांच',
      step3: '3. विज़न ट्रांसफॉर्मर न्यूरल क्लासिफिकेशन',
      step4: '4. जैविक और रासायनिक उपचार तैयार हो रहा है'
    },
    results: {
      title: 'फसल रोग निदान एवं उपचार रिपोर्ट',
      detectedDisease: 'पहचाना गया रोग',
      crop: 'फसल',
      confidence: 'AI सटीकता स्कोर',
      severity: 'रोग की गंभीरता',
      pathogen: 'रोग का प्रकार (फंगल / बैक्टीरियल)',
      symptomsTitle: 'पत्ती पर दिखे प्रमुख लक्षण',
      possibleCauses: 'रोग फैलने के संभावित कारण',
      tabs: {
        immediate: 'तुरंत करने योग्य कदम',
        organic: 'जैविक व देसी उपचार',
        chemical: 'रासायनिक दवा व सही मात्रा',
        prevention: 'दीर्घकालिक रोकथाम',
        expert: 'विशेषज्ञ सलाह'
      },
      audioRead: 'आवाज़ में रिपोर्ट सुनें (ऑडियो)',
      printReport: 'PDF रिपोर्ट डाउनलोड / प्रिंट करें',
      saveReport: 'रिकॉर्ड में सहेजा गया',
      findNearbyHelp: 'निकटतम KVK व कृषि अधिकारी खोजें',
      disclaimerTitle: 'कृषि परामर्श अस्वीकरण'
    },
    severity: {
      healthy: 'स्वस्थ फसल',
      mild: 'हल्का संक्रमण',
      moderate: 'मध्यम रोग प्रभाव',
      severe: 'गंभीर रोग (तत्काल उपचार आवश्यक)'
    },
    resources: {
      title: 'निकटतम कृषि केंद्र एवं सहायता',
      subtitle: 'अपने खेत के पास कृषि विज्ञान केंद्र (KVK), कृषि कार्यालय, प्रमाणित खाद-बीज दुकान और विशेषज्ञ खोजें।',
      filterAll: 'सभी केंद्र',
      filterKvk: 'कृषि विज्ञान केंद्र (KVK)',
      filterAgriOffice: 'सरकारी कृषि कार्यालय',
      filterFertilizer: 'प्रमाणित खाद-कीटनाशक दुकान',
      filterClinics: 'पादप रोग विशेषज्ञ क्लीनिक',
      filterSchemes: 'सरकारी कृषि योजनाएं व सब्सिडी',
      callButton: 'अधिकारी को कॉल करें',
      directionsButton: 'रास्ता देखें (GPS)',
      distanceAway: 'आपके खेत से दूरी',
      useLocationBtn: 'खेत का GPS स्थान लें',
      locationActive: 'GPS लोकेशन सक्रिय'
    },
    crops: {
      title: 'फसल ज्ञान एवं रोग निर्देशिका',
      subtitle: 'प्रमुख फसलों की संपूर्ण जानकारी, रोग पहचान और उत्तम कृषि कार्यप्रणाली।',
      searchPlaceholder: 'फसल या रोग का नाम खोजें (जैसे टमाटर, झुलसा, धान ब्लास्ट)...',
      commonDiseases: 'प्रमुख रोग',
      season: 'उपयुक्त मौसम',
      soil: 'मिट्टी का प्रकार',
      temperature: 'अनुकूल तापमान',
      viewGuide: 'फसल गाइड देखें'
    },
    dashboard: {
      title: 'किसान स्वास्थ्य डैशबोर्ड',
      subtitle: 'आपके खेतों की सभी जांचों, रोग स्थिति और फसल स्वास्थ्य का संपूर्ण विवरण।',
      totalScans: 'कुल जांचें',
      healthyCrops: 'स्वस्थ पत्तियां',
      diseasesFound: 'पहचाने गए रोग',
      highRiskAlerts: 'गंभीर चेतावनी',
      recentScans: 'हाल की जांच रिपोर्ट',
      cropHealthRate: 'फसल स्वास्थ्य दर',
      weatherAdvisory: 'स्थानीय मौसम व रोग चेतावनी'
    },
    history: {
      title: 'पिछली जांचों का इतिहास',
      subtitle: 'पुरानी सभी जांचों और दिए गए उपचारों का सुरक्षित रिकॉर्ड।',
      noReports: 'अभी तक कोई जांच इतिहास नहीं है। अपनी पहली जांच रिपोर्ट तैयार करने के लिए फोटो अपलोड करें।',
      filterCrop: 'फसल अनुसार देखें',
      filterSeverity: 'गंभीरता अनुसार देखें',
      viewDetails: 'पूरी रिपोर्ट देखें',
      delete: 'हटाएं'
    }
  },
  mr: {
    appName: 'क्रॉपगार्ड AI',
    tagline: 'स्मार्ट पीक रोग निदान व उपचार',
    nav: {
      home: 'मुख्यपृष्ठ',
      analyze: 'पीक तपासा',
      crops: 'पीक माहिती',
      resources: 'जवळची केंद्रे',
      history: 'तपासणी इतिहास',
      dashboard: 'डॅशबोर्ड',
      settings: 'सेटिंग्ज'
    },
    hero: {
      badge: 'AI आधारित स्मार्ट कृषी सल्लागार',
      headline: 'रोग पसरण्याआधीच पिकाचे रक्षण करा.',
      subheadline:
        'पानाचा फोटो अपलोड करा आणि सेकंदात AI रोग निदान, प्रतिबंधात्मक उपाय आणि जवळच्या तज्ज्ञांची मदत मिळवा.',
      primaryCta: 'पीक तपासा',
      secondaryCta: 'कसे कार्य करते',
      liveStatsLabel: 'शेतात चाचणी केलेले मॉडेल',
      accuracyRate: '98.4%',
      accuracyLabel: 'अचूकता दर',
      cropsLabel: 'प्रमुख पिके',
      instantLabel: 'झटपट AI सल्ला'
    },
    analyze: {
      title: 'पान रोग AI स्कॅनर',
      subtitle: 'रोगाचे अचूक निदान आणि औषध फवारणीसाठी रोगाचे पान अपलोड करा.',
      dropzoneTitle: 'येथे पाण्याचा फोटो ड्रॅग आणि ड्रॉप करा',
      dropzoneSubtitle: 'किंवा फोन/कॉम्प्युटरमधून निवडा (JPG, PNG, WebP)',
      browseButton: 'फोटो निवडा',
      cameraButton: 'कॅमेऱ्याने फोटो काढा',
      cropSelectLabel: 'पीक निवडा (ऐच्छिक):',
      autoDetect: 'स्वयंचलित पीक ओळख',
      analyzeBtn: 'AI रोग तपासणी सुरू करा',
      tryDemoTitle: 'किंवा नमुना पानांवर झटपट चाचणी करा:',
      tryDemoDesc: 'झटपट तपासणी पाहण्यासाठी खालील नमुन्यावर क्लिक करा.',
      scanningTitle: 'पानाचे AI विश्लेषण सुरू आहे...',
      step1: '१. पानाचा फोटो आणि कडांची तपासणी',
      step2: '२. पानावरील डाग व बुरशी लक्षणांचा शोध',
      step3: '३. न्यूरल नेटवर्क विश्लेषण',
      step4: '४. सेंद्रिय व रासायनिक फवारणी उपाय तयार होत आहेत'
    },
    results: {
      title: 'पीक रोग निदान व उपचार अहवाल',
      detectedDisease: 'आढळलेला रोग',
      crop: 'पीक',
      confidence: 'AI अचूकता गुण',
      severity: 'रोगाची तीव्रता',
      pathogen: 'रोगाचा प्रकार',
      symptomsTitle: 'पानावर दिसलेली लक्षणे',
      possibleCauses: 'रोग वाढीची कारणे',
      tabs: {
        immediate: 'त्वरित उपाय',
        organic: 'सेंद्रिय व जैविक उपाय',
        chemical: 'रासायनिक फवारणी व प्रमाण',
        prevention: 'दीर्घकालीन काळजी',
        expert: 'तज्ज्ञ सल्ला'
      },
      audioRead: 'ध्वनी स्वरूपात अहवाल ऐका (Audio)',
      printReport: 'PDF अहवाल डाउनलोड / प्रिंट करा',
      saveReport: 'नोंद जतन झाली',
      findNearbyHelp: 'जवळचे KVK व कृषी केंद्र शोधा',
      disclaimerTitle: 'कृषी सल्ला अस्वीकरण'
    },
    severity: {
      healthy: 'निरोगी पीक',
      mild: 'सौम्य प्रादुर्भाव',
      moderate: 'मध्यम प्रादुर्भाव',
      severe: 'गंभीर प्रादुर्भाव (तात्काळ फवारणी आवश्यक)'
    },
    resources: {
      title: 'जवळची कृषी केंद्रे व सहाय्य',
      subtitle: 'आपल्या शेताजवळील कृषी विज्ञान केंद्र (KVK), कृषी अधिकारी, खत-औषध दुकाने आणि तज्ज्ञ क्लिनिक.',
      filterAll: 'सर्व केंद्रे',
      filterKvk: 'कृषी विज्ञान केंद्र (KVK)',
      filterAgriOffice: 'शासकीय कृषी कार्यालये',
      filterFertilizer: 'प्रमाणित खत-कीटकनाशक दुकाने',
      filterClinics: 'तज्ज्ञ पीक संरक्षण क्लिनिक',
      filterSchemes: 'शासकीय योजना व सबसिडी',
      callButton: 'अधिकाऱ्यांना कॉल करा',
      directionsButton: 'मार्ग पहा (GPS)',
      distanceAway: 'शेतापासून अंतर',
      useLocationBtn: 'माझे GPS स्थान वापरा',
      locationActive: 'GPS सक्रिय'
    },
    crops: {
      title: 'पीक ज्ञान आणि रोग माहिती',
      subtitle: 'प्रमुख पिकांची सर्वसमावेशक माहिती, रोग ओळख आणि आधुनिक शेती पद्धती.',
      searchPlaceholder: 'पीक किंवा रोगाचे नाव शोधा (उदा. टोमॅटो, करपा, भात ब्लास्ट)...',
      commonDiseases: 'मुख्य रोग',
      season: 'योग्य हंगाम',
      soil: 'जमिनीचा प्रकार',
      temperature: 'अनुकूल तापमान',
      viewGuide: 'पीक मार्गदर्शक पहा'
    },
    dashboard: {
      title: 'शेतकरी आरोग्य डॅशबोर्ड',
      subtitle: 'आपल्या शेतातील पिकांचे आरोग्य व रोगांचा संपूर्ण आढावा.',
      totalScans: 'एकूण तपासण्या',
      healthyCrops: 'निरोगी पाने',
      diseasesFound: 'आढळलेले रोग',
      highRiskAlerts: 'गंभीर धोके',
      recentScans: 'अलीकडील तपासण्या',
      cropHealthRate: 'पीक आरोग्य निर्देशांक',
      weatherAdvisory: 'हवामान व रोग अंदाज'
    },
    history: {
      title: 'तपासणी इतिहास',
      subtitle: 'मागील सर्व तपासण्या व दिलेल्या उपचारांची नोंद.',
      noReports: 'कोणतीही तपासणी नोंद नाही. पहिले पान तपासा.',
      filterCrop: 'पिकानुसार निवडा',
      filterSeverity: 'तीव्रतेनुसार निवडा',
      viewDetails: 'पूर्ण अहवाल पहा',
      delete: 'हटवा'
    }
  },
  ta: {
    appName: 'கிராப்கார்ட் AI',
    tagline: 'ஸ்மார்ட் பயிர் நோய் கண்டறிதல்',
    nav: {
      home: 'முகப்பு',
      analyze: 'பயிர் ஆய்வு',
      crops: 'பயிர் நூலகம்',
      resources: 'அருகிலுள்ள மையங்கள்',
      history: 'வரலாறு',
      dashboard: 'டாஷ்போர்டு',
      settings: 'அமைப்புகள்'
    },
    hero: {
      badge: 'AI விவசாய நோய் தீர்வு',
      headline: 'பயிர் நோய்கள் பரவுவதற்கு முன் கண்டறியவும்.',
      subheadline:
        'இலை புகைப்படத்தை பதிவேற்றி சில நொடிகளில் AI நோய் கண்டறிதல் மற்றும் அருகிலுள்ள விவசாய உதவியைப் பெறுங்கள்.',
      primaryCta: 'பயிரை சோதிக்கவும்',
      secondaryCta: 'எப்படி வேலை செய்கிறது',
      liveStatsLabel: 'சரிபார்க்கப்பட்ட துல்லியம்',
      accuracyRate: '98.4%',
      accuracyLabel: 'துல்லிய விகிதம்',
      cropsLabel: 'முக்கிய பயிர்கள்',
      instantLabel: 'உடனடி AI முடிவு'
    },
    analyze: {
      title: 'இலை நோய் AI ஸ்கேனர்',
      subtitle: 'நோயறிதல் பெற பாதிக்கப்பட்ட இலையின் தெளிவான படத்தை பதிவேற்றவும்.',
      dropzoneTitle: 'இலை படத்தை இங்கே பதிவேற்றவும்',
      dropzoneSubtitle: 'அல்லது கோப்பை தேர்ந்தெடுக்கவும் (JPG, PNG, WebP)',
      browseButton: 'படத்தை தேர்வு செய்க',
      cameraButton: 'கேமராவில் படம் எடுக்க',
      cropSelectLabel: 'பயிரை தேர்வு செய்க:',
      autoDetect: 'தானியங்கி பயிர் கண்டறிதல்',
      analyzeBtn: 'AI ஆய்வை தொடங்குக',
      tryDemoTitle: 'அல்லது மாதிரி இலைகளை உடனடியாக சோதிக்கவும்:',
      tryDemoDesc: 'மாதிரி இலைகளில் ஏதேனும் ஒன்றை கிளிக் செய்யவும்.',
      scanningTitle: 'இலை ஆய்வு செய்யப்படுகிறது...',
      step1: '1. படத்தின் தரத்தை பகுப்பாய்வு செய்தல்',
      step2: '2. இலை புள்ளிகள் மற்றும் பூஞ்சை ஆய்வு',
      step3: '3. AI நியூரல் நெட்வொர்க் பகுப்பாய்வு',
      step4: '4. இயற்கை மற்றும் இரசாயன சிகிச்சை தயாரிப்பு'
    },
    results: {
      title: 'பயிர் நோய் கண்டறிதல் மற்றும் சிகிச்சை அறிக்கை',
      detectedDisease: 'கண்டறியப்பட்ட நோய்',
      crop: 'பயிர்',
      confidence: 'AI துல்லிய மதிப்பெண்',
      severity: 'நோயின் தீவிரம்',
      pathogen: 'நோய்க்கிருமி வகை',
      symptomsTitle: 'இலையில் கண்டறியப்பட்ட அறிகுறிகள்',
      possibleCauses: 'காரணங்கள்',
      tabs: {
        immediate: 'உடனடி நடவடிக்கைகள்',
        organic: 'இயற்கை சிகிச்சை',
        chemical: 'மருந்து அளவு',
        prevention: 'தடுப்பு முறைகள்',
        expert: 'நிபுணர் ஆலோசனை'
      },
      audioRead: 'குரல் வழியில் கேட்கவும் (Audio)',
      printReport: 'PDF அறிக்கையை பதிவிறக்குக',
      saveReport: 'பதிவேட்டில் சேமிக்கப்பட்டது',
      findNearbyHelp: 'அருகிலுள்ள KVK மையத்தை கண்டறியவும்',
      disclaimerTitle: 'விவசாய ஆலோசனை மறுப்பு'
    },
    severity: {
      healthy: 'ஆரோக்கியமான பயிர்',
      mild: 'லேசான தாக்கம்',
      moderate: 'மிதமான தாக்கம்',
      severe: 'கடுமையான தாக்கம்'
    },
    resources: {
      title: 'அருகிலுள்ள விவசாய வளங்கள் & மையங்கள்',
      subtitle: 'வேளாண் அறிவியல் மையம் (KVK), உர கடைகள் மற்றும் அரசு அலுவலகங்கள்.',
      filterAll: 'அனைத்தும்',
      filterKvk: 'KVK மையங்கள்',
      filterAgriOffice: 'வேளாண் அலுவலகங்கள்',
      filterFertilizer: 'உர கடைகள்',
      filterClinics: 'தாவர மருத்துவ மனைகள்',
      filterSchemes: 'அரசு திட்டங்கள் & மானியங்கள்',
      callButton: 'அழைக்கவும்',
      directionsButton: 'வழித்தடம்',
      distanceAway: 'தொலைவில்',
      useLocationBtn: 'GPS இருப்பிடத்தை பெறுக',
      locationActive: 'GPS செயல்படுகிறது'
    },
    crops: {
      title: 'பயிர் அறிவு கலைக்களஞ்சியம்',
      subtitle: 'பயிர் சாகுபடி மற்றும் நோய் மேலாண்மை வழிகாட்டிகள்.',
      searchPlaceholder: 'பயிர் அல்லது நோயை தேடுங்கள்...',
      commonDiseases: 'பொதுவான நோய்கள்',
      season: 'பருவம்',
      soil: 'மண் வகை',
      temperature: 'வெப்பநிலை',
      viewGuide: 'வழிகாட்டியை பார்க்க'
    },
    dashboard: {
      title: 'விவசாயி டாஷ்போர்டு',
      subtitle: 'பயிர் ஆரோக்கியம் மற்றும் பரிசோதனை விவரங்கள்.',
      totalScans: 'மொத்த சோதனைகள்',
      healthyCrops: 'ஆரோக்கியமானவை',
      diseasesFound: 'கண்டறியப்பட்ட நோய்கள்',
      highRiskAlerts: 'அவசர எச்சரிக்கைகள்',
      recentScans: 'சமீபத்திய சோதனைகள்',
      cropHealthRate: 'பயிர் ஆரோக்கிய விகிதம்',
      weatherAdvisory: 'வானிலை ஆலோசனை'
    },
    history: {
      title: 'பரிசோதனை வரலாறு',
      subtitle: 'முந்தைய அனைத்து அறிக்கைகளின் காப்பகம்.',
      noReports: 'வரலாறு ஏதும் இல்லை.',
      filterCrop: 'பயிர் வாரி',
      filterSeverity: 'தீவிரம் வாரி',
      viewDetails: 'முழு விவரம்',
      delete: 'நீக்குக'
    }
  },
  te: {
    appName: 'క్రాప్‌గార్డ్ AI',
    tagline: 'స్మార్ట్ పంట రోగ నిర్ధారణ మరియు నివారణ',
    nav: {
      home: 'హోమ్',
      analyze: 'పంటను తనిఖీ చేయండి',
      crops: 'పంటల వివరాలు',
      resources: 'సమీప కేంద్రాలు',
      history: 'చరిత్ర',
      dashboard: 'డాష్‌బోర్డ్',
      settings: 'సెట్టింగ్‌లు'
    },
    hero: {
      badge: 'AI ఆధారిత వ్యవసాయ రక్షణ',
      headline: 'పంట తెగుళ్లు వ్యాపించకముందే గుర్తించండి.',
      subheadline:
        'ఆకు ఫోటోను అప్‌లోడ్ చేసి సెకన్లలో AI ద్వారా తెగులు గుర్తింపు, నివారణ సూచనలు మరియు సమీప వ్యవసాయ సహాయం పొందండి.',
      primaryCta: 'పంటను పరీక్షించండి',
      secondaryCta: 'ఇది ఎలా పనిచేస్తుంది',
      liveStatsLabel: 'క్షేత్ర స్థాయిలో పరీక్షించబడింది',
      accuracyRate: '98.4%',
      accuracyLabel: 'ఖచ్చితత్వ రేటు',
      cropsLabel: 'ప్రధాన పంటలు',
      instantLabel: 'తక్షణ AI సలహా'
    },
    analyze: {
      title: 'ఆకు తెగులు AI స్కానర్',
      subtitle: 'తెగులు నిర్ధారణ కోసం సోకిన ఆకు యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.',
      dropzoneTitle: 'ఇక్కడ ఆకు ఫోటోను ఉంచండి',
      dropzoneSubtitle: 'లేదా మీ ఫోన్/కంప్యూటర్ నుండి ఫోటో ఎంచుకోండి (JPG, PNG, WebP)',
      browseButton: 'ఫోటో ఎంచుకోండి',
      cameraButton: 'కెమెరాతో ఫోటో తీయండి',
      cropSelectLabel: 'పంటను ఎంచుకోండి:',
      autoDetect: 'ఆటోమేటిక్ పంట గుర్తింపు',
      analyzeBtn: 'AI పరీక్షను ప్రారంభించండి',
      tryDemoTitle: 'లేదా నమూనా ఆకులతో పరీక్షించండి:',
      tryDemoDesc: 'తక్షణ పరీక్ష కోసం కింద ఉన్న నమూనాపై క్లిక్ చేయండి.',
      scanningTitle: 'ఆకు విశ్లేషణ జరుగుతోంది...',
      step1: '1. ఆకు ఫోటో నాణ్యత తనిఖీ',
      step2: '2. తెగులు మచ్చలు మరియు ఫంగస్ గుర్తింపు',
      step3: '3. AI న్యూరల్ నెట్‌వర్క్ నిర్ధారణ',
      step4: '4. సేంద్రీయ మరియు రసాయన మందుల సూచన'
    },
    results: {
      title: 'పంట తెగులు నిర్ధారణ & నివారణ నివేదిక',
      detectedDisease: 'గుర్తించబడిన తెగులు',
      crop: 'పంట',
      confidence: 'AI ఖచ్చితత్వ స్కోరు',
      severity: 'తీవ్రత',
      pathogen: 'తెగులు రకం',
      symptomsTitle: 'ఆకుపై కనిపించిన లక్షణాలు',
      possibleCauses: 'తెగులు రావడానికి కారణాలు',
      tabs: {
        immediate: 'తక్షణ చర్యలు',
        organic: 'సేంద్రీయ నివారణ',
        chemical: 'రసాయన మందులు & మోతాదు',
        prevention: 'దీర్ఘకాలిక జాగ్రత్తలు',
        expert: 'నిపుణుల సలహా'
      },
      audioRead: 'ఆడియోలో నివేదిక వినండి (Audio)',
      printReport: 'PDF నివేదికను డౌన్‌లోడ్ / ప్రింట్ చేయండి',
      saveReport: 'రికార్డులలో భద్రపరచబడింది',
      findNearbyHelp: 'సమీప KVK మరియు వ్యవసాయ కేంద్రాన్ని కనుగొనండి',
      disclaimerTitle: 'వ్యవసాయ సలహా నిరాకరణ'
    },
    severity: {
      healthy: 'ఆరోగ్యకరమైన పంట',
      mild: 'తేలికపాటి తెగులు',
      moderate: 'మధ్యస్థ తెగులు',
      severe: 'తీవ్రమైన తెగులు (వెంటనే మందులు పిచికారీ చేయండి)'
    },
    resources: {
      title: 'సమీప వ్యవసాయ కేంద్రాలు & సహాయం',
      subtitle: 'కృషి విజ్ఞాన కేంద్రాలు (KVK), ప్రభుత్వ వ్యవసాయ కార్యాలయాలు, ఎరువుల దుకాణాలు మరియు నిపుణులు.',
      filterAll: 'అన్ని కేంద్రాలు',
      filterKvk: 'కృషి విజ్ఞాన కేంద్రాలు (KVK)',
      filterAgriOffice: 'ప్రభుత్వ వ్యవసాయ కార్యాలయాలు',
      filterFertilizer: 'ఎరువులు & పురుగుమందుల దుకాణాలు',
      filterClinics: 'మొక్కల క్లినిక్‌లు',
      filterSchemes: 'ప్రభుత్వ పథకాలు & రాయితీలు',
      callButton: 'కాల్ చేయండి',
      directionsButton: 'దారి చూడండి (GPS)',
      distanceAway: 'దూరంలో ఉంది',
      useLocationBtn: 'నా GPS లొకేషన్ వాడండి',
      locationActive: 'GPS ఆన్‌లో ఉంది'
    },
    crops: {
      title: 'పంటల సమాచారం & తెగుళ్ల మార్గదర్శి',
      subtitle: 'ప్రధాన పంటల పూర్తి సాగు విధానాలు మరియు తెగుళ్ల నివారణ పద్ధతులు.',
      searchPlaceholder: 'పంట లేదా తెగులు పేరును వెతకండి...',
      commonDiseases: 'సాధారణ తెగుళ్లు',
      season: 'అనుకూల కాలం',
      soil: 'నేల రకం',
      temperature: 'ఉష్ణోగ్రత',
      viewGuide: 'పూర్తి వివరాలు'
    },
    dashboard: {
      title: 'రైతు ఆరోగ్య డాష్‌బోర్డ్',
      subtitle: 'మీ పంటల ఆరోగ్యం మరియు పరీక్షల సమగ్ర సమాచారం.',
      totalScans: 'మొత్తం పరీక్షలు',
      healthyCrops: 'ఆరోగ్యకరమైన ఆకులు',
      diseasesFound: 'గుర్తించిన తెగుళ్లు',
      highRiskAlerts: 'తీవ్ర హెచ్చరికలు',
      recentScans: 'ఇటీవలి పరీక్షలు',
      cropHealthRate: 'పంట ఆరోగ్య సూచిక',
      weatherAdvisory: 'వాతావరణ హెచ్చరిక'
    },
    history: {
      title: 'పరీక్షల చరిత్ర',
      subtitle: 'గత పరీక్షల మరియు చికిత్సల రికార్డు.',
      noReports: 'ఇంకా పరీక్షల చరిత్ర లేదు.',
      filterCrop: 'పంట ప్రకారం',
      filterSeverity: 'తీవ్రత ప్రకారం',
      viewDetails: 'పూర్తి నివేదిక',
      delete: 'తొలగించు'
    }
  }
};
