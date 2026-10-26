export type SupportedLanguage = "en" | "hi" | "ta" | "te" | "bn" | "mr" | "gu";

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી" },
];

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    // Brand & Header
    "brand.name": "GovInnovate",
    "brand.badge": "GovTech Sandbox",
    "brand.tagline": "Public Procurement Mechanism for Startups",
    
    // Auth & Actions
    "nav.signIn": "Sign In",
    "nav.registerStartup": "Register Startup",
    "nav.register": "Register",
    "nav.govtSignUp": "Govt Sign Up",
    "nav.resetDemo": "Reset Demo",
    "nav.language": "Language",
    
    // Demo Scenario Bar
    "scenario.label": "Demo Scenario:",
    "scenario.stage": "Stage:",
    "scenario.flow": "Procurement Flow:",
    
    // Roles
    "role.govt": "Govt",
    "role.startup": "Startup",
    "role.eval": "Eval",
    "role.govtAdmin": "Department Administrator",
    "role.startupVerified": "DPIIT Verified Startup",
    "role.evalPanel": "Expert Technical Panel",
    
    // Navigation Flow Pills
    "flow.landing": "1. Landing",
    "flow.govDashboard": "2. Gov Dashboard",
    "flow.createChallenge": "3. Create Challenge",
    "flow.aiMatches": "4. AI Startup Matches",
    "flow.startupProfile": "5. Startup Profile",
    "flow.startupDashboard": "6. Startup Dashboard",
    "flow.reviewShortlist": "7. Review & Shortlist",
    "flow.evalScorecard": "8. Evaluator Scorecard",
    "flow.pilot": "9. 90-Day Pilot",
    "flow.kpi": "10. KPI Dashboard",
    "flow.validation": "11. Validation Report",
    "flow.procurement": "12. Procurement Approval",
    "flow.scaleUp": "13. Scale-Up (50 Locs)",
    "flow.auditTrail": "Audit Trail",
    "flow.documents": "Documents",
  },
  hi: {
    // Brand & Header
    "brand.name": "गवइनोवेट",
    "brand.badge": "गवटेक सैंडबॉक्स",
    "brand.tagline": "स्टार्टअप्स के लिए सार्वजनिक खरीद प्रणाली",
    
    // Auth & Actions
    "nav.signIn": "लॉग इन",
    "nav.registerStartup": "स्टार्टअप पंजीकरण",
    "nav.register": "पंजीकरण",
    "nav.govtSignUp": "सरकारी पंजीकरण",
    "nav.resetDemo": "डेमो रीसेट",
    "nav.language": "भाषा",
    
    // Demo Scenario Bar
    "scenario.label": "डेमो परिदृश्य:",
    "scenario.stage": "चरण:",
    "scenario.flow": "खरीद प्रक्रिया:",
    
    // Roles
    "role.govt": "सरकार",
    "role.startup": "स्टार्टअप",
    "role.eval": "मूल्यांकन",
    "role.govtAdmin": "विभागीय प्रशासक",
    "role.startupVerified": "DPIIT सत्यापित स्टार्टअप",
    "role.evalPanel": "विशेषज्ञ तकनीकी पैनल",
    
    // Navigation Flow Pills
    "flow.landing": "1. मुख्य पृष्ठ",
    "flow.govDashboard": "2. सरकारी डैशबोर्ड",
    "flow.createChallenge": "3. चुनौती बनाएं",
    "flow.aiMatches": "4. AI स्टार्टअप मैच",
    "flow.startupProfile": "5. स्टार्टअप प्रोफाइल",
    "flow.startupDashboard": "6. स्टार्टअप डैशबोर्ड",
    "flow.reviewShortlist": "7. समीक्षा व चयन",
    "flow.evalScorecard": "8. मूल्यांकन स्कोरकार्ड",
    "flow.pilot": "9. 90-दिवसीय पायलट",
    "flow.kpi": "10. KPI डैशबोर्ड",
    "flow.validation": "11. सत्यापन रिपोर्ट",
    "flow.procurement": "12. खरीद स्वीकृति",
    "flow.scaleUp": "13. विस्तार (50 स्थान)",
    "flow.auditTrail": "ऑडिट ट्रेल",
    "flow.documents": "दस्तावेज़",
  },
  ta: {
    // Brand & Header
    "brand.name": "கவ்இன்னோவேட்",
    "brand.badge": "அரசுத் தொழில்நுட்பம்",
    "brand.tagline": "ஸ்டார்ட்அப்களுக்கான பொதுக் கொள்முதல் தளம்",
    
    // Auth & Actions
    "nav.signIn": "உள்நுழைக",
    "nav.registerStartup": "ஸ்டார்ட்அப் பதிவு",
    "nav.register": "பதிவு",
    "nav.govtSignUp": "அரசு பதிவு",
    "nav.resetDemo": "மீட்டமை",
    "nav.language": "மொழி",
    
    // Demo Scenario Bar
    "scenario.label": "மாதிரி காட்சி:",
    "scenario.stage": "நிலை:",
    "scenario.flow": "கொள்முதல் படிமுறை:",
    
    // Roles
    "role.govt": "அரசு",
    "role.startup": "ஸ்டார்ட்அப்",
    "role.eval": "மதிப்பீடு",
    "role.govtAdmin": "துறை நிர்வாகி",
    "role.startupVerified": "DPIIT சரிபார்க்கப்பட்ட ஸ்டார்ட்அப்",
    "role.evalPanel": "தொழில்நுட்ப மதிப்பீட்டுக் குழு",
    
    // Navigation Flow Pills
    "flow.landing": "1. முகப்பு",
    "flow.govDashboard": "2. அரசு பலகை",
    "flow.createChallenge": "3. சவால் உருவாக்கம்",
    "flow.aiMatches": "4. AI பொருத்தங்கள்",
    "flow.startupProfile": "5. ஸ்டார்ட்அப் விவரம்",
    "flow.startupDashboard": "6. ஸ்டார்ட்அப் பலகை",
    "flow.reviewShortlist": "7. சரிபார்த்தல்",
    "flow.evalScorecard": "8. மதிப்பீட்டு அட்டை",
    "flow.pilot": "9. 90-நாள் பைலட்",
    "flow.kpi": "10. KPI கண்காணிப்பு",
    "flow.validation": "11. சான்றிதழ் அறிக்கை",
    "flow.procurement": "12. கொள்முதல் ஒப்புதல்",
    "flow.scaleUp": "13. விரிவாக்கம் (50 இடங்கள்)",
    "flow.auditTrail": "தணிக்கை பதிவு",
    "flow.documents": "ஆவணங்கள்",
  },
  te: {
    // Brand & Header
    "brand.name": "గవ్‌ఇన్నోవేట్",
    "brand.badge": "గవ్‌టెక్ శాండ్‌బాక్స్",
    "brand.tagline": "స్టార్టప్‌ల కోసం ప్రభుత్వ కొనుగోలు వేదిక",
    
    // Auth & Actions
    "nav.signIn": "లాగిన్",
    "nav.registerStartup": "స్టార్టప్ నమోదు",
    "nav.register": "నమోదు",
    "nav.govtSignUp": "ప్రభుత్వ నమోదు",
    "nav.resetDemo": "రీసెట్",
    "nav.language": "భాష",
    
    // Demo Scenario Bar
    "scenario.label": "డెమో దృశ్యం:",
    "scenario.stage": "దశ:",
    "scenario.flow": "కొనుగోలు క్రమం:",
    
    // Roles
    "role.govt": "ప్రభుత్వం",
    "role.startup": "స్టార్టప్",
    "role.eval": "మూల్యాంకనం",
    "role.govtAdmin": "శాఖ నిర్వాహకుడు",
    "role.startupVerified": "DPIIT ధృవీకరించిన స్టార్టప్",
    "role.evalPanel": "సాంకేతిక నిపుణుల కమిటీ",
    
    // Navigation Flow Pills
    "flow.landing": "1. ముఖ్యాంశం",
    "flow.govDashboard": "2. ప్రభుత్వ డాష్‌బోర్డ్",
    "flow.createChallenge": "3. సవాలు సృష్టి",
    "flow.aiMatches": "4. AI సరిపోలికలు",
    "flow.startupProfile": "5. స్టార్టప్ ప్రొఫైల్",
    "flow.startupDashboard": "6. స్టార్టప్ డాష్‌బోర్డ్",
    "flow.reviewShortlist": "7. పరిశీలన",
    "flow.evalScorecard": "8. మూల్యాంకన స్కోరు",
    "flow.pilot": "9. 90 రోజుల పైలట్",
    "flow.kpi": "10. KPI డాష్‌బోర్డ్",
    "flow.validation": "11. ధృవీకరణ నివేదిక",
    "flow.procurement": "12. కొనుగోలు ఆమోదం",
    "flow.scaleUp": "13. విస్తరణ (50 స్థానాలు)",
    "flow.auditTrail": "ఆడిట్ లాగ్",
    "flow.documents": "పత్రాలు",
  },
  mr: {
    // Brand & Header
    "brand.name": "गव्हइनोव्हेट",
    "brand.badge": "गव्हटेक सँडबॉक्स",
    "brand.tagline": "स्टार्टअप्ससाठी सार्वजनिक खरेदी प्रणाली",
    
    // Auth & Actions
    "nav.signIn": "साइन इन",
    "nav.registerStartup": "स्टार्टअप नोंदणी",
    "nav.register": "नोंदणी",
    "nav.govtSignUp": "शासकीय नोंदणी",
    "nav.resetDemo": "रीसेट करा",
    "nav.language": "भाषा",
    
    // Demo Scenario Bar
    "scenario.label": "डेमो परिदृश्य:",
    "scenario.stage": "टप्पा:",
    "scenario.flow": "खरेदी प्रक्रिया:",
    
    // Roles
    "role.govt": "शासन",
    "role.startup": "स्टार्टअप",
    "role.eval": "मूल्यांकन",
    "role.govtAdmin": "विभागीय प्रशासक",
    "role.startupVerified": "DPIIT प्रमाणित स्टार्टअप",
    "role.evalPanel": "तांत्रिक तज्ज्ञ समिती",
    
    // Navigation Flow Pills
    "flow.landing": "1. मुख्यपृष्ठ",
    "flow.govDashboard": "2. शासकीय डॅशबोर्ड",
    "flow.createChallenge": "3. आव्हान तयार करा",
    "flow.aiMatches": "4. AI स्टार्टअप जुळणी",
    "flow.startupProfile": "5. स्टार्टअप प्रोफाइल",
    "flow.startupDashboard": "6. स्टार्टअप डॅशबोर्ड",
    "flow.reviewShortlist": "7. पुनरावलोकन व निवड",
    "flow.evalScorecard": "8. मूल्यांकन स्कोरकार्ड",
    "flow.pilot": "9. 90-दिवसीय पायलट",
    "flow.kpi": "10. KPI डॅशबोर्ड",
    "flow.validation": "11. पडताळणी अहवाल",
    "flow.procurement": "12. खरेदी मंजुरी",
    "flow.scaleUp": "13. विस्तार (50 ठिकाणे)",
    "flow.auditTrail": "ऑडिट नोंदी",
    "flow.documents": "कागदपत्रे",
  },
  bn: {
    // Brand & Header
    "brand.name": "গভইনোভেট",
    "brand.badge": "গভটেক স্যান্ডবক্স",
    "brand.tagline": "স্টার্টআপদের জন্য সরকারি সংগ্রহ ব্যবস্থা",
    
    // Auth & Actions
    "nav.signIn": "সাইন ইন",
    "nav.registerStartup": "স্টার্টআপ নিবন্ধন",
    "nav.register": "নিবন্ধন",
    "nav.govtSignUp": "সরকারি নিবন্ধন",
    "nav.resetDemo": "রিসেট করুন",
    "nav.language": "ভাষা",
    
    // Demo Scenario Bar
    "scenario.label": "ডেমো পরিস্থিতি:",
    "scenario.stage": "পর্যায়:",
    "scenario.flow": "সংগ্রহ প্রক্রিয়া:",
    
    // Roles
    "role.govt": "সরকার",
    "role.startup": "স্টার্টআপ",
    "role.eval": "মূল্যায়ন",
    "role.govtAdmin": "বিভাগীয় প্রশাসক",
    "role.startupVerified": "DPIIT যাচাইকৃত স্টার্টআপ",
    "role.evalPanel": "বিশেষজ্ঞ প্রযুক্তি প্যানেল",
    
    // Navigation Flow Pills
    "flow.landing": "1. হোমপেজ",
    "flow.govDashboard": "2. সরকারি ড্যাশবোর্ড",
    "flow.createChallenge": "3. চ্যালেঞ্জ তৈরি",
    "flow.aiMatches": "4. AI স্টার্টআপ ম্যাচ",
    "flow.startupProfile": "5. স্টার্টআপ প্রোফাইল",
    "flow.startupDashboard": "6. স্টার্টআপ ড্যাশবোর্ড",
    "flow.reviewShortlist": "7. পর্যালোচনা ও বাছাই",
    "flow.evalScorecard": "8. মূল্যায়ন স্কোরকার্ড",
    "flow.pilot": "9. ৯০ দিনের পাইলট",
    "flow.kpi": "10. KPI ড্যাশবোর্ড",
    "flow.validation": "11. যাচাইকরণ রিপোর্ট",
    "flow.procurement": "12. সংগ্রহ অনুমোদন",
    "flow.scaleUp": "13. সম্প্রসারণ (৫০টি স্থান)",
    "flow.auditTrail": "অডিট ট্রেইল",
    "flow.documents": "নথিপত্র",
  },
  gu: {
    // Brand & Header
    "brand.name": "ગવઇનોવેટ",
    "brand.badge": "ગવટેક સેન્ડબોક્સ",
    "brand.tagline": "સ્ટાર્ટઅપ્સ માટે જાહેર ખરીદી વ્યવસ્થા",
    
    // Auth & Actions
    "nav.signIn": "સાઇન ઇન",
    "nav.registerStartup": "સ્ટાર્ટઅપ નોંધણી",
    "nav.register": "નોંધણી",
    "nav.govtSignUp": "સરકારી નોંધણી",
    "nav.resetDemo": "રીસેટ કરો",
    "nav.language": "ભાષા",
    
    // Demo Scenario Bar
    "scenario.label": "ડેમો પરિસ્થિતિ:",
    "scenario.stage": "તબક્કો:",
    "scenario.flow": "ખરીદી પ્રક્રિયા:",
    
    // Roles
    "role.govt": "સરકાર",
    "role.startup": "સ્ટાર્ટઅપ",
    "role.eval": "મૂલ્યાંકન",
    "role.govtAdmin": "વિભાગીય વહીવટકર્તા",
    "role.startupVerified": "DPIIT પ્રમાણિત સ્ટાર્ટઅપ",
    "role.evalPanel": "તકનીકી નિષ્ણાત પેનલ",
    
    // Navigation Flow Pills
    "flow.landing": "1. હોમપેજ",
    "flow.govDashboard": "2. સરકારી ડેશબોર્ડ",
    "flow.createChallenge": "3. પડકાર બનાવો",
    "flow.aiMatches": "4. AI સ્ટાર્ટઅપ મેચ",
    "flow.startupProfile": "5. સ્ટાર્ટઅપ પ્રોફાઇલ",
    "flow.startupDashboard": "6. સ્ટાર્ટઅપ ડેશબોર્ડ",
    "flow.reviewShortlist": "7. સમીક્ષા અને પસંદગી",
    "flow.evalScorecard": "8. મૂલ્યાંકન સ્કોરકાર્ડ",
    "flow.pilot": "9. 90-દિવસીય પાઇલટ",
    "flow.kpi": "10. KPI ડેશબોર્ડ",
    "flow.validation": "11. ચકાસણી અહેવાલ",
    "flow.procurement": "12. ખરીદી મંજૂરી",
    "flow.scaleUp": "13. વિસ્તરણ (50 સ્થળો)",
    "flow.auditTrail": "ઓડિટ ટ્રેઇલ",
    "flow.documents": "દસ્તાવેજો",
  },
};

export const getTranslation = (lang: SupportedLanguage, key: string): string => {
  if (translations[lang] && translations[lang][key]) {
    return translations[lang][key];
  }
  if (translations.en && translations.en[key]) {
    return translations.en[key];
  }
  return key;
};
