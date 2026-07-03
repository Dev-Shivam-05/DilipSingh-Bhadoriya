/**
 * Document Seva guide library — the SEO traffic engine.
 * Every guide is written for real usefulness in all three languages.
 * Facts (portals, offices) current as of 2026; fees are indicative.
 */

export type L10n = { gu: string; hi: string; en: string };

export type Guide = {
  slug: string;
  category: "identity" | "certificate" | "property" | "welfare";
  emoji: string;
  popular?: boolean;
  title: L10n;
  intro: L10n;
  documents: { gu: string[]; hi: string[]; en: string[] };
  fees: L10n;
  time: L10n;
  office: L10n;
  steps: { gu: string[]; hi: string[]; en: string[] };
  faqs: { q: L10n; a: L10n }[];
};

const digitalGujarat: L10n = {
  gu: "ડિજિટલ ગુજરાત પોર્ટલ (digitalgujarat.gov.in) અથવા નજીકનું જન સેવા કેન્દ્ર / મામલતદાર કચેરી, નવસારી",
  hi: "डिजिटल गुजरात पोर्टल (digitalgujarat.gov.in) या नज़दीकी जन सेवा केंद्र / मामलतदार कार्यालय, नवसारी",
  en: "Digital Gujarat portal (digitalgujarat.gov.in) or the nearest Jan Seva Kendra / Mamlatdar office, Navsari",
};

export const guides: Guide[] = [
  {
    slug: "income-certificate-gujarat",
    category: "certificate",
    emoji: "📄",
    popular: true,
    title: {
      gu: "આવકનો દાખલો (Income Certificate) કેવી રીતે કઢાવવો",
      hi: "आय प्रमाणपत्र (Income Certificate) कैसे बनवाएँ",
      en: "How to get an Income Certificate in Gujarat",
    },
    intro: {
      gu: "શિષ્યવૃત્તિ, સરકારી યોજના, EWS અનામત — બધે આવકનો દાખલો જોઈએ. ગુજરાતમાં આ દાખલો મામલતદાર કચેરી કે ડિજિટલ ગુજરાત પોર્ટલથી નીકળે છે અને ૩ વર્ષ માન્ય રહે છે.",
      hi: "छात्रवृत्ति, सरकारी योजना, EWS आरक्षण — हर जगह आय प्रमाणपत्र चाहिए। गुजरात में यह मामलतदार कार्यालय या डिजिटल गुजरात पोर्टल से बनता है और 3 साल मान्य रहता है।",
      en: "Scholarships, government schemes, EWS reservation — everything needs an income certificate. In Gujarat it is issued by the Mamlatdar office or the Digital Gujarat portal and stays valid for 3 years.",
    },
    documents: {
      gu: ["આધાર કાર્ડ (અરજદાર)", "રેશન કાર્ડ / લાઇટ બિલ (રહેઠાણ પુરાવો)", "આવકનો પુરાવો — પગાર સ્લિપ / તલાટીનો દાખલો", "પાસપોર્ટ સાઇઝ ફોટો", "સ્વ-ઘોષણા (self-declaration) ફોર્મ"],
      hi: ["आधार कार्ड (आवेदक)", "राशन कार्ड / बिजली बिल (निवास प्रमाण)", "आय का प्रमाण — वेतन पर्ची / तलाटी का दाखिला", "पासपोर्ट साइज़ फोटो", "स्व-घोषणा (self-declaration) फॉर्म"],
      en: ["Aadhaar card (applicant)", "Ration card / electricity bill (address proof)", "Income proof — salary slip / Talati certificate", "Passport-size photo", "Self-declaration form"],
    },
    fees: { gu: "₹20 કોર્ટ ફી સ્ટેમ્પ + સેવા શુલ્ક આશરે ₹30–50", hi: "₹20 कोर्ट फ़ीस स्टाम्प + सेवा शुल्क लगभग ₹30–50", en: "₹20 court-fee stamp + service charge approx ₹30–50" },
    time: { gu: "સામાન્ય રીતે 7–15 દિવસ", hi: "आमतौर पर 7–15 दिन", en: "Usually 7–15 days" },
    office: digitalGujarat,
    steps: {
      gu: [
        "ડિજિટલ ગુજરાત પોર્ટલ પર રજિસ્ટ્રેશન કરો (મોબાઇલ નંબર + આધારથી) અથવા સીધા જન સેવા કેન્દ્ર જાઓ.",
        "'Revenue' વિભાગમાં 'Income Certificate' સેવા પસંદ કરો અને ફોર્મ ભરો.",
        "ઉપરના બધા ડોક્યુમેન્ટ સ્કેન કરી અપલોડ કરો (દરેક 1MBથી નાનું, PDF/JPG).",
        "ફી ઓનલાઇન ભરો અને અરજી નંબર સાચવો.",
        "તલાટી/મામલતદાર ચકાસણી કરશે — જરૂર પડે તો રૂબરૂ બોલાવે.",
        "મંજૂરી પછી દાખલો પોર્ટલ પરથી ડાઉનલોડ કરો — ડિજિટલ સહી માન્ય છે.",
      ],
      hi: [
        "डिजिटल गुजरात पोर्टल पर रजिस्ट्रेशन करें (मोबाइल + आधार से) या सीधे जन सेवा केंद्र जाएँ।",
        "'Revenue' विभाग में 'Income Certificate' सेवा चुनें और फॉर्म भरें।",
        "ऊपर के सभी दस्तावेज़ स्कैन करके अपलोड करें (हर फ़ाइल 1MB से छोटी, PDF/JPG)।",
        "फ़ीस ऑनलाइन भरें और आवेदन नंबर सँभालें।",
        "तलाटी/मामलतदार सत्यापन करेंगे — ज़रूरत पड़ने पर बुलाया जा सकता है।",
        "मंज़ूरी के बाद प्रमाणपत्र पोर्टल से डाउनलोड करें — डिजिटल हस्ताक्षर मान्य है।",
      ],
      en: [
        "Register on the Digital Gujarat portal (mobile + Aadhaar) or visit a Jan Seva Kendra directly.",
        "Under 'Revenue' services choose 'Income Certificate' and fill the form.",
        "Scan and upload all documents listed above (each under 1MB, PDF/JPG).",
        "Pay the fee online and save the application number.",
        "The Talati/Mamlatdar verifies — you may be called in person if needed.",
        "Once approved, download the certificate from the portal — the digital signature is valid.",
      ],
    },
    faqs: [
      {
        q: { gu: "દાખલો કેટલા વર્ષ ચાલે?", hi: "प्रमाणपत्र कितने साल मान्य है?", en: "How long is it valid?" },
        a: { gu: "ગુજરાતમાં આવકનો દાખલો ૩ નાણાકીય વર્ષ માટે માન્ય ગણાય છે.", hi: "गुजरात में आय प्रमाणपत्र 3 वित्तीय वर्षों के लिए मान्य होता है।", en: "In Gujarat an income certificate is treated as valid for 3 financial years." },
      },
      {
        q: { gu: "આવક કોણ પ્રમાણિત કરે?", hi: "आय कौन प्रमाणित करता है?", en: "Who certifies the income?" },
        a: { gu: "ગ્રામ્ય વિસ્તારમાં તલાટી અને શહેરમાં મામલતદાર કચેરી ચકાસણી કરીને પ્રમાણિત કરે છે.", hi: "ग्रामीण क्षेत्र में तलाटी और शहर में मामलतदार कार्यालय सत्यापित करता है।", en: "The Talati (rural) or the Mamlatdar office (urban) verifies and certifies it." },
      },
    ],
  },
  {
    slug: "caste-certificate-gujarat",
    category: "certificate",
    emoji: "🪪",
    popular: true,
    title: {
      gu: "જાતિનો દાખલો (Caste Certificate) — સંપૂર્ણ માર્ગદર્શન",
      hi: "जाति प्रमाणपत्र (Caste Certificate) — पूरी गाइड",
      en: "Caste Certificate in Gujarat — complete guide",
    },
    intro: {
      gu: "શાળા પ્રવેશ, શિષ્યવૃત્તિ, સરકારી નોકરી અને અનામતના લાભ માટે SC/ST/OBC (SEBC) જાતિનો દાખલો ફરજિયાત છે. એક વાર નીકળ્યા પછી કાયમ માન્ય રહે છે.",
      hi: "स्कूल प्रवेश, छात्रवृत्ति, सरकारी नौकरी और आरक्षण के लाभ के लिए SC/ST/OBC (SEBC) जाति प्रमाणपत्र अनिवार्य है। एक बार बनने के बाद यह स्थायी रूप से मान्य रहता है।",
      en: "For school admission, scholarships, government jobs and reservation benefits, an SC/ST/OBC (SEBC) caste certificate is mandatory. Once issued, it remains valid for life.",
    },
    documents: {
      gu: ["આધાર કાર્ડ", "શાળા છોડ્યાનું પ્રમાણપત્ર (LC) — જેમાં જાતિ લખેલી હોય", "પિતા/દાદાનો જાતિનો દાખલો અથવા LC", "રેશન કાર્ડ / રહેઠાણ પુરાવો", "પાસપોર્ટ ફોટો"],
      hi: ["आधार कार्ड", "स्कूल छोड़ने का प्रमाणपत्र (LC) — जिसमें जाति लिखी हो", "पिता/दादा का जाति प्रमाणपत्र या LC", "राशन कार्ड / निवास प्रमाण", "पासपोर्ट फोटो"],
      en: ["Aadhaar card", "School Leaving Certificate (LC) mentioning caste", "Father's/grandfather's caste certificate or LC", "Ration card / address proof", "Passport photo"],
    },
    fees: { gu: "₹20 કોર્ટ ફી સ્ટેમ્પ + સેવા શુલ્ક", hi: "₹20 कोर्ट फ़ीस स्टाम्प + सेवा शुल्क", en: "₹20 court-fee stamp + service charge" },
    time: { gu: "10–20 દિવસ (ચકાસણી પર આધારિત)", hi: "10–20 दिन (सत्यापन पर निर्भर)", en: "10–20 days (depends on verification)" },
    office: digitalGujarat,
    steps: {
      gu: [
        "ડિજિટલ ગુજરાત પોર્ટલ પર 'Caste Certificate' સેવા પસંદ કરો (SC/ST માટે અલગ, SEBC/OBC માટે અલગ ફોર્મ છે).",
        "ફોર્મમાં કુટુંબની વિગત ભરો — પિતાની જાતિનો પુરાવો સૌથી મહત્ત્વનો છે.",
        "ડોક્યુમેન્ટ અપલોડ કરી અરજી સબમિટ કરો.",
        "તલાટી/સર્કલ ઓફિસર સ્થળ ચકાસણી કે પૂછપરછ કરી શકે.",
        "મંજૂર થયે દાખલો ડાઉનલોડ કરો; OBC માટે નોન-ક્રીમી લેયર (NCL) અલગથી કઢાવવું પડે તો સાથે જ કરાવી લેવું.",
      ],
      hi: [
        "डिजिटल गुजरात पोर्टल पर 'Caste Certificate' सेवा चुनें (SC/ST और SEBC/OBC के फॉर्म अलग हैं)।",
        "फॉर्म में परिवार का विवरण भरें — पिता की जाति का प्रमाण सबसे महत्वपूर्ण है।",
        "दस्तावेज़ अपलोड कर आवेदन जमा करें।",
        "तलाटी/सर्कल अधिकारी स्थल सत्यापन या पूछताछ कर सकते हैं।",
        "मंज़ूरी पर प्रमाणपत्र डाउनलोड करें; OBC के लिए नॉन-क्रीमी लेयर (NCL) भी साथ ही बनवा लें।",
      ],
      en: [
        "On Digital Gujarat choose the 'Caste Certificate' service (separate forms for SC/ST and SEBC/OBC).",
        "Fill family details — the father's caste proof is the most important document.",
        "Upload documents and submit the application.",
        "The Talati/Circle Officer may do a field verification or enquiry.",
        "Download the certificate once approved; for OBC also get the Non-Creamy Layer (NCL) certificate in the same visit.",
      ],
    },
    faqs: [
      {
        q: { gu: "પિતાનો દાખલો ન હોય તો?", hi: "पिता का प्रमाणपत्र न हो तो?", en: "What if my father has no certificate?" },
        a: { gu: "દાદા કે કાકા-ફોઈના LC/દાખલાથી પણ વંશાવળી સાબિત થઈ શકે. મુશ્કેલ કેસમાં દિલીપસિંહ ભાઈને મળો — રસ્તો નીકળે છે.", hi: "दादा या चाचा-बुआ के LC/प्रमाणपत्र से भी वंशावली साबित हो सकती है। कठिन मामलों में दिलीपसिंह भाई से मिलें — रास्ता निकलता है।", en: "Lineage can also be proved via grandfather's or uncle's/aunt's LC. For tricky cases, meet Dilipsingh bhai — there is usually a way." },
      },
    ],
  },
  {
    slug: "domicile-certificate-gujarat",
    category: "certificate",
    emoji: "🏠",
    title: {
      gu: "ડોમિસાઇલ સર્ટિફિકેટ (રહેઠાણનો દાખલો) કેવી રીતે મેળવવો",
      hi: "डोमिसाइल सर्टिफिकेट (निवास प्रमाणपत्र) कैसे पाएँ",
      en: "How to get a Domicile Certificate in Gujarat",
    },
    intro: {
      gu: "કોલેજ પ્રવેશ (ખાસ કરીને મેડિકલ/એન્જિનિયરિંગ), સરકારી ભરતી અને યોજનાઓ માટે ગુજરાતના રહેવાસી હોવાનો પુરાવો — ડોમિસાઇલ સર્ટિફિકેટ.",
      hi: "कॉलेज प्रवेश (विशेषकर मेडिकल/इंजीनियरिंग), सरकारी भर्ती और योजनाओं के लिए गुजरात निवासी होने का प्रमाण — डोमिसाइल सर्टिफिकेट।",
      en: "Proof of being a Gujarat resident for college admission (especially medical/engineering), government recruitment and schemes.",
    },
    documents: {
      gu: ["આધાર કાર્ડ", "જન્મનો દાખલો અથવા શાળાનું LC", "10 વર્ષ રહેઠાણનો પુરાવો (લાઇટ બિલ/વેરા પહોંચ/રેશન કાર્ડ)", "પાસપોર્ટ ફોટો", "સ્વ-ઘોષણા"],
      hi: ["आधार कार्ड", "जन्म प्रमाणपत्र या स्कूल का LC", "10 वर्ष निवास का प्रमाण (बिजली बिल/कर रसीद/राशन कार्ड)", "पासपोर्ट फोटो", "स्व-घोषणा"],
      en: ["Aadhaar card", "Birth certificate or school LC", "Proof of 10 years' residence (electricity bill/tax receipt/ration card)", "Passport photo", "Self-declaration"],
    },
    fees: { gu: "₹20 કોર્ટ ફી સ્ટેમ્પ + સેવા શુલ્ક", hi: "₹20 कोर्ट फ़ीस स्टाम्प + सेवा शुल्क", en: "₹20 court-fee stamp + service charge" },
    time: { gu: "7–15 દિવસ", hi: "7–15 दिन", en: "7–15 days" },
    office: digitalGujarat,
    steps: {
      gu: [
        "ડિજિટલ ગુજરાત પર 'Domicile Certificate' સેવા ખોલો.",
        "જન્મ ગુજરાતમાં થયો હોય તો જન્મના દાખલાથી સીધું; બહાર થયો હોય તો 10 વર્ષ રહેઠાણના પુરાવા જોડો.",
        "ફોર્મ + ડોક્યુમેન્ટ સબમિટ કરી ફી ભરો.",
        "મામલતદાર ચકાસણી બાદ પ્રમાણપત્ર ડિજિટલ સહી સાથે મળશે.",
      ],
      hi: [
        "डिजिटल गुजरात पर 'Domicile Certificate' सेवा खोलें।",
        "जन्म गुजरात में हुआ हो तो जन्म प्रमाणपत्र से सीधे; बाहर हुआ हो तो 10 वर्ष निवास के प्रमाण लगाएँ।",
        "फॉर्म + दस्तावेज़ जमा कर फ़ीस भरें।",
        "मामलतदार सत्यापन के बाद डिजिटल हस्ताक्षर वाला प्रमाणपत्र मिलेगा।",
      ],
      en: [
        "Open the 'Domicile Certificate' service on Digital Gujarat.",
        "If born in Gujarat, the birth certificate is enough; otherwise attach 10 years of residence proof.",
        "Submit the form + documents and pay the fee.",
        "After Mamlatdar verification you receive the digitally signed certificate.",
      ],
    },
    faqs: [],
  },
  {
    slug: "aadhaar-card-correction",
    category: "identity",
    emoji: "🆔",
    popular: true,
    title: {
      gu: "આધાર કાર્ડમાં નામ, જન્મતારીખ કે સરનામું કેવી રીતે સુધારવું",
      hi: "आधार कार्ड में नाम, जन्मतिथि या पता कैसे सुधारें",
      en: "How to correct name, DOB or address in Aadhaar",
    },
    intro: {
      gu: "આધારમાં એક અક્ષરની ભૂલ પણ બેંક, સિમકાર્ડ અને યોજનાના કામ અટકાવે છે. મોટા ભાગના સુધારા નવસારીના આધાર સેવા કેન્દ્રમાં 15 મિનિટમાં થાય છે.",
      hi: "आधार में एक अक्षर की गलती भी बैंक, सिम और योजना के काम रोक देती है। ज़्यादातर सुधार नवसारी के आधार सेवा केंद्र में 15 मिनट में हो जाते हैं।",
      en: "Even a one-letter error in Aadhaar blocks bank, SIM and scheme work. Most corrections take 15 minutes at a Navsari Aadhaar Seva Kendra.",
    },
    documents: {
      gu: ["હાલનું આધાર કાર્ડ", "નામ માટે: પાન/પાસપોર્ટ/LC", "જન્મતારીખ માટે: જન્મનો દાખલો કે LC", "સરનામા માટે: લાઇટ બિલ/રેશન કાર્ડ/બેંક પાસબુક (3 મહિનાની અંદરનું)"],
      hi: ["वर्तमान आधार कार्ड", "नाम के लिए: पैन/पासपोर्ट/LC", "जन्मतिथि के लिए: जन्म प्रमाणपत्र या LC", "पते के लिए: बिजली बिल/राशन कार्ड/बैंक पासबुक (3 माह के भीतर का)"],
      en: ["Current Aadhaar card", "For name: PAN/passport/LC", "For DOB: birth certificate or LC", "For address: electricity bill/ration card/bank passbook (within 3 months)"],
    },
    fees: { gu: "બાયોમેટ્રિક/વિગત સુધારો: ₹50 (સરનામું ઓનલાઇન: ₹50)", hi: "बायोमेट्रिक/विवरण सुधार: ₹50 (पता ऑनलाइन: ₹50)", en: "Demographic/biometric update: ₹50 (address online: ₹50)" },
    time: { gu: "કેન્દ્રમાં 15 મિનિટ; અપડેટ 7–30 દિવસમાં", hi: "केंद्र में 15 मिनट; अपडेट 7–30 दिन में", en: "15 min at the centre; update reflects in 7–30 days" },
    office: {
      gu: "આધાર સેવા કેન્દ્ર / પોસ્ટ ઓફિસ / બેંકમાં આધાર ડેસ્ક, નવસારી. સરનામું myaadhaar.uidai.gov.in પરથી ઘરબેઠાં.",
      hi: "आधार सेवा केंद्र / पोस्ट ऑफिस / बैंक का आधार डेस्क, नवसारी। पता myaadhaar.uidai.gov.in से घर बैठे।",
      en: "Aadhaar Seva Kendra / post office / bank Aadhaar desk in Navsari. Address can be updated from home at myaadhaar.uidai.gov.in.",
    },
    steps: {
      gu: [
        "uidai.gov.in પર 'Book Appointment'થી નવસારી કેન્દ્રનો સમય બુક કરો (વગર એપોઇન્ટમેન્ટ પણ ચાલે, લાઇન વધુ).",
        "મૂળ ડોક્યુમેન્ટ લઈને જાઓ — ઝેરોક્ષ નહીં, સ્કેન ત્યાં જ થાય છે.",
        "ફોર્મ ભરી બાયોમેટ્રિક આપો અને ₹50 ફી ભરો; પહોંચ (URN) સાચવો.",
        "myaadhaar પોર્ટલ પર URN થી સ્ટેટસ ટ્રેક કરો.",
        "અપડેટ થયા બાદ નવું e-Aadhaar મફત ડાઉનલોડ કરો.",
      ],
      hi: [
        "uidai.gov.in पर 'Book Appointment' से नवसारी केंद्र का समय बुक करें (बिना अपॉइंटमेंट भी चलता है, लाइन ज़्यादा)।",
        "मूल दस्तावेज़ लेकर जाएँ — फोटोकॉपी नहीं, स्कैन वहीं होता है।",
        "फॉर्म भरकर बायोमेट्रिक दें और ₹50 फ़ीस भरें; रसीद (URN) सँभालें।",
        "myaadhaar पोर्टल पर URN से स्थिति ट्रैक करें।",
        "अपडेट के बाद नया e-Aadhaar मुफ़्त डाउनलोड करें।",
      ],
      en: [
        "Book a slot for a Navsari centre via 'Book Appointment' on uidai.gov.in (walk-in works too, longer queue).",
        "Carry ORIGINAL documents — they scan them there; photocopies are not accepted.",
        "Fill the form, give biometrics, pay ₹50; keep the receipt (URN).",
        "Track status with the URN on the myAadhaar portal.",
        "Once updated, download the new e-Aadhaar free.",
      ],
    },
    faqs: [
      {
        q: { gu: "જન્મતારીખ કેટલી વાર બદલી શકાય?", hi: "जन्मतिथि कितनी बार बदल सकते हैं?", en: "How many times can DOB be changed?" },
        a: { gu: "નિયમ પ્રમાણે જન્મતારીખ સામાન્ય રીતે એક જ વાર સુધારી શકાય, એટલે પુરાવો પાકો રાખવો.", hi: "नियम अनुसार जन्मतिथि सामान्यतः एक ही बार सुधर सकती है, इसलिए प्रमाण पक्का रखें।", en: "As per rules DOB can normally be corrected only once — bring solid proof." },
      },
    ],
  },
  {
    slug: "pan-card-apply",
    category: "identity",
    emoji: "💳",
    title: {
      gu: "નવું PAN કાર્ડ — ઓનલાઇન અરજી, ઘરે બેઠાં",
      hi: "नया PAN कार्ड — ऑनलाइन आवेदन, घर बैठे",
      en: "New PAN card — apply online from home",
    },
    intro: {
      gu: "બેંક ખાતું, મિલકતનો દસ્તાવેજ, ₹50,000થી વધુ વ્યવહાર — PAN વગર કંઈ નહીં. આધાર હોય તો e-PAN 10 મિનિટમાં મફત મળે છે.",
      hi: "बैंक खाता, संपत्ति दस्तावेज़, ₹50,000 से ऊपर लेनदेन — PAN के बिना कुछ नहीं। आधार हो तो e-PAN 10 मिनट में मुफ़्त मिलता है।",
      en: "Bank account, property deed, transactions above ₹50,000 — nothing works without PAN. With Aadhaar, an e-PAN is free in 10 minutes.",
    },
    documents: {
      gu: ["આધાર કાર્ડ (મોબાઇલ લિંક હોવો જરૂરી)", "ફિઝિકલ કાર્ડ માટે: ફોટો + સહી + ઓળખ/સરનામાનો પુરાવો"],
      hi: ["आधार कार्ड (मोबाइल लिंक ज़रूरी)", "फिज़िकल कार्ड के लिए: फोटो + हस्ताक्षर + पहचान/पता प्रमाण"],
      en: ["Aadhaar card (mobile must be linked)", "For a physical card: photo + signature + ID/address proof"],
    },
    fees: { gu: "ઇન્સ્ટન્ટ e-PAN: મફત · ફિઝિકલ કાર્ડ: ₹107 આસપાસ", hi: "इंस्टेंट e-PAN: मुफ़्त · फिज़िकल कार्ड: लगभग ₹107", en: "Instant e-PAN: free · physical card: around ₹107" },
    time: { gu: "e-PAN: 10–30 મિનિટ · ફિઝિકલ: 15 દિવસ", hi: "e-PAN: 10–30 मिनट · फिज़िकल: 15 दिन", en: "e-PAN: 10–30 minutes · physical: ~15 days" },
    office: {
      gu: "incometax.gov.in (Instant e-PAN) અથવા NSDL/UTIITSL કેન્દ્ર, નવસારી",
      hi: "incometax.gov.in (Instant e-PAN) या NSDL/UTIITSL केंद्र, नवसारी",
      en: "incometax.gov.in (Instant e-PAN) or an NSDL/UTIITSL centre in Navsari",
    },
    steps: {
      gu: [
        "incometax.gov.in પર 'Instant e-PAN' ખોલો.",
        "આધાર નંબર નાખો; આધાર સાથે લિંક મોબાઇલ પર OTP આવશે.",
        "વિગતો ચકાસી સબમિટ કરો — બસ, અરજી થઈ ગઈ.",
        "10–30 મિનિટમાં e-PAN PDF ડાઉનલોડ કરો (ડિજિટલ સહી માન્ય).",
        "ફિઝિકલ કાર્ડ જોઈએ તો એ જ પોર્ટલથી ₹107માં ઓર્ડર કરો.",
      ],
      hi: [
        "incometax.gov.in पर 'Instant e-PAN' खोलें।",
        "आधार नंबर डालें; आधार से लिंक मोबाइल पर OTP आएगा।",
        "विवरण जाँचकर सबमिट करें — बस, आवेदन हो गया।",
        "10–30 मिनट में e-PAN PDF डाउनलोड करें (डिजिटल हस्ताक्षर मान्य)।",
        "फिज़िकल कार्ड चाहिए तो उसी पोर्टल से ₹107 में ऑर्डर करें।",
      ],
      en: [
        "Open 'Instant e-PAN' on incometax.gov.in.",
        "Enter your Aadhaar number; an OTP comes to the Aadhaar-linked mobile.",
        "Verify details and submit — that's the whole application.",
        "Download the e-PAN PDF in 10–30 minutes (digitally signed, fully valid).",
        "If you want a physical card, order it from the same portal for ~₹107.",
      ],
    },
    faqs: [
      {
        q: { gu: "આધારમાં મોબાઇલ લિંક નથી, શું કરવું?", hi: "आधार में मोबाइल लिंक नहीं है, क्या करें?", en: "My mobile isn't linked to Aadhaar — now what?" },
        a: { gu: "પહેલા આધાર કેન્દ્રમાં જઈ મોબાઇલ લિંક કરાવો (₹50), પછી e-PAN કરો. અથવા NSDL કેન્દ્રથી ફોર્મ 49A ભરી ફિઝિકલ અરજી કરો.", hi: "पहले आधार केंद्र जाकर मोबाइल लिंक कराएँ (₹50), फिर e-PAN करें। या NSDL केंद्र से फॉर्म 49A भरकर आवेदन करें।", en: "First link your mobile at an Aadhaar centre (₹50), then do e-PAN. Or apply physically via Form 49A at an NSDL centre." },
      },
    ],
  },
  {
    slug: "ration-card-gujarat",
    category: "welfare",
    emoji: "🌾",
    popular: true,
    title: {
      gu: "નવું રેશન કાર્ડ / નામ ઉમેરવું-કમી કરવું — ગુજરાત",
      hi: "नया राशन कार्ड / नाम जोड़ना-हटाना — गुजरात",
      en: "New ration card / add-remove names — Gujarat",
    },
    intro: {
      gu: "NFSA અનાજ, આયુષ્માન કાર્ડ, અનેક યોજનાઓનો આધાર રેશન કાર્ડ છે. લગ્ન પછી નામ ઉમેરવું કે અલગ કાર્ડ કરાવવું — બધી પ્રક્રિયા અહીં.",
      hi: "NFSA अनाज, आयुष्मान कार्ड, कई योजनाओं का आधार राशन कार्ड है। शादी के बाद नाम जोड़ना या अलग कार्ड बनवाना — पूरी प्रक्रिया यहाँ।",
      en: "Ration card underpins NFSA grain, Ayushman card and many schemes. Adding a name after marriage or splitting a card — the full process here.",
    },
    documents: {
      gu: ["કુટુંબના બધા સભ્યોના આધાર", "લાઇટ બિલ / ભાડા કરાર (રહેઠાણ)", "જૂનું રેશન કાર્ડ (નામ ફેરફાર માટે)", "લગ્ન નોંધણી (પત્નીનું નામ ઉમેરવા)", "પાસપોર્ટ ફોટો"],
      hi: ["परिवार के सभी सदस्यों के आधार", "बिजली बिल / किराया अनुबंध (निवास)", "पुराना राशन कार्ड (नाम बदलाव हेतु)", "विवाह पंजीकरण (पत्नी का नाम जोड़ने हेतु)", "पासपोर्ट फोटो"],
      en: ["Aadhaar of all family members", "Electricity bill / rent agreement (residence)", "Old ration card (for changes)", "Marriage registration (to add spouse)", "Passport photo"],
    },
    fees: { gu: "નજીવી — ₹2–20 (કેટેગરી પ્રમાણે)", hi: "मामूली — ₹2–20 (श्रेणी अनुसार)", en: "Nominal — ₹2–20 (by category)" },
    time: { gu: "15–30 દિવસ", hi: "15–30 दिन", en: "15–30 days" },
    office: {
      gu: "ipds.gujarat.gov.in / ડિજિટલ ગુજરાત, અથવા ઝોનલ પુરવઠા કચેરી (મામલતદાર), નવસારી",
      hi: "ipds.gujarat.gov.in / डिजिटल गुजरात, या ज़ोनल आपूर्ति कार्यालय (मामलतदार), नवसारी",
      en: "ipds.gujarat.gov.in / Digital Gujarat, or the zonal supply office (Mamlatdar), Navsari",
    },
    steps: {
      gu: [
        "ડિજિટલ ગુજરાત પર 'New Ration Card' કે 'Member Addition/Deletion' સેવા પસંદ કરો.",
        "કુટુંબના બધા સભ્યોના આધાર e-KYC કરાવો — આ પગલું સૌથી વધુ અટકે છે.",
        "ડોક્યુમેન્ટ અપલોડ કરી સબમિટ કરો; અરજી નંબર સાચવો.",
        "પુરવઠા નિરીક્ષક ચકાસણી કરે — ઘરે મુલાકાત શક્ય.",
        "મંજૂરી બાદ e-RC ડાઉનલોડ થાય; દુકાનમાં અંગૂઠાથી અનાજ શરૂ.",
      ],
      hi: [
        "डिजिटल गुजरात पर 'New Ration Card' या 'Member Addition/Deletion' सेवा चुनें।",
        "परिवार के सभी सदस्यों का आधार e-KYC कराएँ — यही कदम सबसे ज़्यादा अटकता है।",
        "दस्तावेज़ अपलोड कर जमा करें; आवेदन नंबर सँभालें।",
        "आपूर्ति निरीक्षक सत्यापन करेंगे — घर पर विज़िट संभव।",
        "मंज़ूरी के बाद e-RC डाउनलोड होगा; दुकान पर अँगूठे से अनाज शुरू।",
      ],
      en: [
        "On Digital Gujarat choose 'New Ration Card' or 'Member Addition/Deletion'.",
        "Complete Aadhaar e-KYC for every family member — this is where most applications get stuck.",
        "Upload documents and submit; save the application number.",
        "The supply inspector verifies — a home visit is possible.",
        "After approval download the e-RC; grain starts at the fair-price shop with thumb verification.",
      ],
    },
    faqs: [],
  },
  {
    slug: "voter-id-navsari",
    category: "identity",
    emoji: "🗳️",
    title: {
      gu: "મતદાર કાર્ડ (Voter ID) — નવું, સુધારો કે સરનામું બદલવું",
      hi: "वोटर कार्ड (Voter ID) — नया, सुधार या पता बदलना",
      en: "Voter ID — new card, corrections or address change",
    },
    intro: {
      gu: "18 વર્ષ પૂરાં થયાં? મતદાર યાદીમાં નામ એ તમારો અવાજ છે. બધું હવે Voter Helpline એપ પરથી ઘરબેઠાં થાય છે.",
      hi: "18 साल पूरे हुए? मतदाता सूची में नाम ही आपकी आवाज़ है। सब कुछ अब Voter Helpline ऐप से घर बैठे होता है।",
      en: "Turned 18? Your name on the voter roll is your voice. Everything now works from home via the Voter Helpline app.",
    },
    documents: {
      gu: ["આધાર / જન્મ પુરાવો", "પાસપોર્ટ ફોટો", "રહેઠાણ પુરાવો (સરનામું બદલવા)"],
      hi: ["आधार / जन्म प्रमाण", "पासपोर्ट फोटो", "निवास प्रमाण (पता बदलने हेतु)"],
      en: ["Aadhaar / birth proof", "Passport photo", "Address proof (for address change)"],
    },
    fees: { gu: "મફત", hi: "मुफ़्त", en: "Free" },
    time: { gu: "30–60 દિવસ (BLO ચકાસણી સાથે)", hi: "30–60 दिन (BLO सत्यापन सहित)", en: "30–60 days (incl. BLO verification)" },
    office: {
      gu: "voters.eci.gov.in / Voter Helpline એપ; મદદ માટે તમારા બૂથના BLO",
      hi: "voters.eci.gov.in / Voter Helpline ऐप; मदद के लिए आपके बूथ के BLO",
      en: "voters.eci.gov.in / Voter Helpline app; your booth's BLO for help",
    },
    steps: {
      gu: [
        "Voter Helpline એપ ડાઉનલોડ કરી મોબાઇલથી લોગિન કરો.",
        "નવા મતદાર માટે ફોર્મ 6, સુધારા માટે ફોર્મ 8 ભરો.",
        "ફોટો અને પુરાવા અપલોડ કરી સબમિટ કરો; રેફરન્સ નંબર સાચવો.",
        "BLO ઘરે ચકાસણી કરવા આવી શકે.",
        "નામ યાદીમાં આવ્યા બાદ e-EPIC ડાઉનલોડ કરો — કાર્ડ પોસ્ટથી પણ આવે.",
      ],
      hi: [
        "Voter Helpline ऐप डाउनलोड कर मोबाइल से लॉगिन करें।",
        "नए मतदाता के लिए फॉर्म 6, सुधार के लिए फॉर्म 8 भरें।",
        "फोटो और प्रमाण अपलोड कर जमा करें; रेफरेंस नंबर सँभालें।",
        "BLO घर पर सत्यापन के लिए आ सकते हैं।",
        "नाम सूची में आने पर e-EPIC डाउनलोड करें — कार्ड डाक से भी आता है।",
      ],
      en: [
        "Download the Voter Helpline app and log in with your mobile.",
        "Fill Form 6 for new voters, Form 8 for corrections.",
        "Upload photo and proofs, submit; save the reference number.",
        "The BLO may visit home for verification.",
        "Once on the roll, download the e-EPIC — the card also arrives by post.",
      ],
    },
    faqs: [],
  },
  {
    slug: "birth-certificate-navsari",
    category: "certificate",
    emoji: "👶",
    title: {
      gu: "જન્મનો દાખલો — નવસારી નગરપાલિકામાંથી કેવી રીતે મેળવવો",
      hi: "जन्म प्रमाणपत्र — नवसारी नगरपालिका से कैसे पाएँ",
      en: "Birth certificate from Navsari Municipality",
    },
    intro: {
      gu: "શાળા પ્રવેશથી પાસપોર્ટ સુધી — જન્મનો દાખલો પહેલો દસ્તાવેજ છે. નવસારી–વિજલપોરમાં જન્મ નોંધણી અને નકલ e-Nagar પોર્ટલ કે નગરપાલિકા કચેરીથી મળે.",
      hi: "स्कूल प्रवेश से पासपोर्ट तक — जन्म प्रमाणपत्र पहला दस्तावेज़ है। नवसारी–विजलपोर में जन्म पंजीकरण और प्रतिलिपि e-Nagar पोर्टल या नगरपालिका कार्यालय से मिलती है।",
      en: "From school admission to passport — the birth certificate is document #1. In Navsari–Vijalpore, registration and copies come via the e-Nagar portal or the municipality office.",
    },
    documents: {
      gu: ["હોસ્પિટલનો જન્મ રિપોર્ટ (સંસ્થાકીય જન્મ)", "માતા-પિતાના આધાર", "લગ્ન નોંધણી (હોય તો)", "મોડી નોંધણી (1 વર્ષ પછી): સોગંદનામું + મામલતદાર હુકમ"],
      hi: ["अस्पताल की जन्म रिपोर्ट (संस्थागत जन्म)", "माता-पिता के आधार", "विवाह पंजीकरण (हो तो)", "देर से पंजीकरण (1 वर्ष बाद): शपथपत्र + मामलतदार आदेश"],
      en: ["Hospital birth report (institutional birth)", "Parents' Aadhaar", "Marriage registration (if available)", "Late registration (after 1 year): affidavit + Mamlatdar order"],
    },
    fees: { gu: "નોંધણી 21 દિવસમાં મફત; નકલ ₹5–20; મોડી નોંધણીમાં દંડ", hi: "21 दिन में पंजीकरण मुफ़्त; प्रतिलिपि ₹5–20; देर पर शुल्क", en: "Free if registered within 21 days; copy ₹5–20; late fee applies" },
    time: { gu: "નકલ: 1–3 દિવસ · મોડી નોંધણી: 1–2 મહિના", hi: "प्रतिलिपि: 1–3 दिन · देर से पंजीकरण: 1–2 महीने", en: "Copy: 1–3 days · late registration: 1–2 months" },
    office: {
      gu: "નવસારી–વિજલપોર નગરપાલિકા, જન્મ-મરણ નોંધણી શાખા; ઓનલાઇન enagar.gujarat.gov.in",
      hi: "नवसारी–विजलपोर नगरपालिका, जन्म-मृत्यु पंजीकरण शाखा; ऑनलाइन enagar.gujarat.gov.in",
      en: "Navsari–Vijalpore Municipality, birth-death registration branch; online at enagar.gujarat.gov.in",
    },
    steps: {
      gu: [
        "હોસ્પિટલમાં જન્મ થયો હોય તો હોસ્પિટલ જ 21 દિવસમાં નોંધણી કરાવે છે — ખાતરી કરી લો.",
        "e-Nagar પોર્ટલ પર 'Birth Certificate' સેવામાં શોધો (નામ/તારીખથી).",
        "નકલ માટે ઓનલાઇન ફી ભરી ડિજિટલ પ્રમાણપત્ર ડાઉનલોડ કરો.",
        "રેકોર્ડ ન મળે તો નગરપાલિકા કચેરીએ જૂના રજિસ્ટરમાં શોધ કરાવો.",
        "1 વર્ષથી મોડું હોય તો સોગંદનામું કરી મામલતદારના હુકમથી નોંધણી થાય — આમાં દિલીપસિંહ ભાઈની મદદ લો.",
      ],
      hi: [
        "अस्पताल में जन्म हुआ हो तो अस्पताल ही 21 दिन में पंजीकरण कराता है — पुष्टि कर लें।",
        "e-Nagar पोर्टल पर 'Birth Certificate' सेवा में खोजें (नाम/तारीख से)।",
        "प्रतिलिपि के लिए ऑनलाइन फ़ीस भरकर डिजिटल प्रमाणपत्र डाउनलोड करें।",
        "रिकॉर्ड न मिले तो नगरपालिका कार्यालय में पुराने रजिस्टर में खोज कराएँ।",
        "1 वर्ष से देर हो तो शपथपत्र बनाकर मामलतदार आदेश से पंजीकरण होता है — इसमें दिलीपसिंह भाई की मदद लें।",
      ],
      en: [
        "For hospital births the hospital itself registers within 21 days — just confirm it happened.",
        "Search the 'Birth Certificate' service on the e-Nagar portal (by name/date).",
        "Pay the small fee online and download the digital certificate.",
        "If no record is found, request a search of old registers at the municipality office.",
        "If more than a year late, registration needs an affidavit + Mamlatdar order — take Dilipsingh bhai's help for this.",
      ],
    },
    faqs: [],
  },
  {
    slug: "death-certificate-navsari",
    category: "certificate",
    emoji: "🕊️",
    title: {
      gu: "મરણનો દાખલો — પ્રક્રિયા અને LIC ક્લેમ માટે મહત્ત્વ",
      hi: "मृत्यु प्रमाणपत्र — प्रक्रिया और LIC क्लेम के लिए महत्व",
      en: "Death certificate — process, and why LIC claims need it",
    },
    intro: {
      gu: "વારસાઈ, બેંક, વીમા ક્લેમ — દરેક કામનું પહેલું પગથિયું મરણનો દાખલો છે. દુઃખના સમયમાં આ પ્રક્રિયા સરળ ભાષામાં.",
      hi: "विरासत, बैंक, बीमा क्लेम — हर काम की पहली सीढ़ी मृत्यु प्रमाणपत्र है। दुख की घड़ी में यह प्रक्रिया सरल भाषा में।",
      en: "Inheritance, bank, insurance claims — every process starts with the death certificate. Explained simply, for a difficult time.",
    },
    documents: {
      gu: ["હોસ્પિટલ/સ્મશાનની પહોંચ", "મૃતકનું આધાર", "અરજદારનું આધાર અને સંબંધનો પુરાવો"],
      hi: ["अस्पताल/श्मशान की रसीद", "मृतक का आधार", "आवेदक का आधार और संबंध प्रमाण"],
      en: ["Hospital/crematorium slip", "Deceased's Aadhaar", "Applicant's Aadhaar and relationship proof"],
    },
    fees: { gu: "21 દિવસમાં નોંધણી મફત; નકલ ₹5–20", hi: "21 दिन में पंजीकरण मुफ़्त; प्रतिलिपि ₹5–20", en: "Free within 21 days; copy ₹5–20" },
    time: { gu: "નકલ 1–3 દિવસ", hi: "प्रतिलिपि 1–3 दिन", en: "Copy in 1–3 days" },
    office: {
      gu: "નવસારી–વિજલપોર નગરપાલિકા / e-Nagar પોર્ટલ",
      hi: "नवसारी–विजलपोर नगरपालिका / e-Nagar पोर्टल",
      en: "Navsari–Vijalpore Municipality / e-Nagar portal",
    },
    steps: {
      gu: [
        "હોસ્પિટલમાં અવસાન થયું હોય તો હોસ્પિટલ ફોર્મ 2 ભરી નગરપાલિકાને મોકલે છે.",
        "ઘરે થયું હોય તો 21 દિવસમાં નગરપાલિકામાં જાણ કરો (સ્મશાન પહોંચ સાથે).",
        "નોંધણી બાદ e-Nagar પરથી નકલ ડાઉનલોડ કરો — ક્લેમ માટે 4–5 નકલ કઢાવી રાખવી.",
        "LIC ક્લેમ, બેંક, વારસાઈ માટે આ દાખલો + વારસાઈના દાખલાની જરૂર પડશે — બંને સાથે કરાવો.",
      ],
      hi: [
        "अस्पताल में निधन हुआ हो तो अस्पताल फॉर्म 2 भरकर नगरपालिका भेजता है।",
        "घर पर हुआ हो तो 21 दिन में नगरपालिका को सूचित करें (श्मशान रसीद सहित)।",
        "पंजीकरण के बाद e-Nagar से प्रतिलिपि डाउनलोड करें — क्लेम हेतु 4–5 प्रतियाँ निकलवा लें।",
        "LIC क्लेम, बैंक, विरासत के लिए यह प्रमाणपत्र + वारिस प्रमाणपत्र चाहिए होगा — दोनों साथ करा लें।",
      ],
      en: [
        "For hospital deaths, the hospital files Form 2 with the municipality.",
        "For deaths at home, inform the municipality within 21 days (with the crematorium slip).",
        "After registration, download copies from e-Nagar — get 4–5 copies for claims.",
        "LIC claims, banks and inheritance also need the heirship certificate — get both done together.",
      ],
    },
    faqs: [],
  },
  {
    slug: "7-12-utara-anyror",
    category: "property",
    emoji: "🌱",
    popular: true,
    title: {
      gu: "૭/૧૨ ઉતારો અને પ્રોપર્ટી કાર્ડ — ઘરબેઠાં ઓનલાઇન",
      hi: "7/12 उतारा और प्रॉपर्टी कार्ड — घर बैठे ऑनलाइन",
      en: "7/12 extract & property card — online from home",
    },
    intro: {
      gu: "જમીન કોના નામે છે? બોજો છે કે નહીં? ખેતીની જમીનનો ૭/૧૨ અને શહેરની મિલકતનું પ્રોપર્ટી કાર્ડ — બંને AnyRoR પોર્ટલ પર મફત જોવા મળે છે. મિલકત ખરીદતા પહેલાં આ તપાસ ફરજિયાત કરો.",
      hi: "ज़मीन किसके नाम है? बोझ है या नहीं? खेती की ज़मीन का 7/12 और शहरी संपत्ति का प्रॉपर्टी कार्ड — दोनों AnyRoR पोर्टल पर मुफ़्त दिखते हैं। संपत्ति खरीदने से पहले यह जाँच अनिवार्य रूप से करें।",
      en: "Whose name is the land in? Any encumbrance? The 7/12 extract (agricultural) and property card (urban) are both free to view on the AnyRoR portal. Check this BEFORE buying any property.",
    },
    documents: {
      gu: ["કંઈ નહીં — માત્ર જિલ્લો, તાલુકો, ગામ અને સર્વે/ખાતા નંબર"],
      hi: ["कुछ नहीं — केवल ज़िला, तालुका, गाँव और सर्वे/खाता नंबर"],
      en: ["Nothing — just district, taluka, village and survey/khata number"],
    },
    fees: { gu: "જોવું: મફત · પ્રમાણિત નકલ (ડિજિટલ સહી): નજીવી ફી", hi: "देखना: मुफ़्त · प्रमाणित प्रति (डिजिटल हस्ताक्षर): मामूली शुल्क", en: "Viewing: free · certified digitally-signed copy: nominal fee" },
    time: { gu: "તરત", hi: "तुरंत", en: "Instant" },
    office: {
      gu: "anyror.gujarat.gov.in · પ્રમાણિત નકલ: i-ORA પોર્ટલ કે તલાટી/મામલતદાર",
      hi: "anyror.gujarat.gov.in · प्रमाणित प्रति: i-ORA पोर्टल या तलाटी/मामलतदार",
      en: "anyror.gujarat.gov.in · certified copy via the i-ORA portal or Talati/Mamlatdar",
    },
    steps: {
      gu: [
        "anyror.gujarat.gov.in ખોલો → 'View Land Record - Rural' (ખેતી) કે 'Urban' (શહેર).",
        "જિલ્લો નવસારી → તાલુકો (નવસારી/જલાલપોર વગેરે) → ગામ પસંદ કરો.",
        "સર્વે નંબર/ખાતા નંબર/માલિકના નામથી શોધો.",
        "VF-7 (માલિકી), VF-8A (ખાતું), VF-6 (ફેરફાર નોંધ) જુઓ — બોજો/ગીરો અહીં દેખાય.",
        "કાયદેસર નકલ જોઈએ તો i-ORA પરથી ડિજિટલ સહી વાળી નકલ મંગાવો.",
        "કોઈ પણ સોદા પહેલાં છેલ્લા 30 વર્ષની ફેરફાર નોંધ તપાસવી — શંકા હોય તો દિલીપસિંહ ભાઈને બતાવો.",
      ],
      hi: [
        "anyror.gujarat.gov.in खोलें → 'View Land Record - Rural' (खेती) या 'Urban' (शहर)।",
        "ज़िला नवसारी → तालुका → गाँव चुनें।",
        "सर्वे नंबर/खाता नंबर/मालिक के नाम से खोजें।",
        "VF-7 (स्वामित्व), VF-8A (खाता), VF-6 (एंट्री) देखें — बोझ/गिरवी यहीं दिखती है।",
        "क़ानूनी प्रति चाहिए तो i-ORA से डिजिटल हस्ताक्षर वाली प्रति मँगवाएँ।",
        "किसी भी सौदे से पहले पिछले 30 वर्षों की एंट्री जाँचें — संदेह हो तो दिलीपसिंह भाई को दिखाएँ।",
      ],
      en: [
        "Open anyror.gujarat.gov.in → 'View Land Record - Rural' (agricultural) or 'Urban'.",
        "Pick district Navsari → taluka → village.",
        "Search by survey number / khata number / owner name.",
        "Check VF-7 (ownership), VF-8A (khata), VF-6 (mutation entries) — encumbrances show here.",
        "For a legal copy, order the digitally signed version via i-ORA.",
        "Before any deal, review 30 years of mutation entries — if anything looks off, show it to Dilipsingh bhai.",
      ],
    },
    faqs: [
      {
        q: { gu: "૭/૧૨ અને પ્રોપર્ટી કાર્ડમાં ફરક શું?", hi: "7/12 और प्रॉपर्टी कार्ड में फ़र्क क्या?", en: "7/12 vs property card — what's the difference?" },
        a: { gu: "૭/૧૨ ખેતીની જમીન માટે (ગામ નમૂના 7 અને 12), પ્રોપર્ટી કાર્ડ શહેરી બિન-ખેતી મિલકત માટે. વિજલપોર જેવા વિસ્તારમાં બંને જોવા મળે.", hi: "7/12 कृषि भूमि के लिए (गाँव नमूना 7 व 12), प्रॉपर्टी कार्ड शहरी गैर-कृषि संपत्ति के लिए। विजलपोर जैसे क्षेत्र में दोनों मिलते हैं।", en: "7/12 is for agricultural land (village forms 7 & 12); the property card is for urban non-agricultural property. Areas like Vijalpore have both." },
      },
    ],
  },
  {
    slug: "varsai-inheritance-gujarat",
    category: "property",
    emoji: "🧾",
    popular: true,
    title: {
      gu: "વારસાઈ (Varsai) — વારસદારના નામે મિલકત કેવી રીતે ચઢાવવી",
      hi: "वारसाई (उत्तराधिकार) — वारिस के नाम संपत्ति कैसे चढ़ाएँ",
      en: "Varsai (inheritance entry) — transferring property to legal heirs",
    },
    intro: {
      gu: "સ્વજનના અવસાન પછી જમીન-મકાન વારસદારોના નામે કરવા 'વારસાઈ નોંધ' કરાવવી પડે. આ નવસારીમાં સૌથી વધુ પુછાતું અને સૌથી વધુ ગૂંચવાતું કામ છે — અહીં આખી પ્રક્રિયા સાફ ભાષામાં.",
      hi: "स्वजन के निधन के बाद ज़मीन-मकान वारिसों के नाम करने के लिए 'वारसाई एंट्री' करानी पड़ती है। यह नवसारी में सबसे ज़्यादा पूछा जाने वाला और सबसे ज़्यादा उलझने वाला काम है — यहाँ पूरी प्रक्रिया साफ़ भाषा में।",
      en: "After a family member passes away, the 'varsai' mutation entry moves land/property to the legal heirs' names. It is Navsari's most-asked and most-confusing process — here it is, in plain language.",
    },
    documents: {
      gu: ["મરણનો દાખલો", "પેઢીનામું (વારસદારોની યાદી) — સોગંદનામા સાથે", "મૃતકના નામનો ૭/૧૨ / પ્રોપર્ટી કાર્ડ", "બધા વારસદારોના આધાર", "લગ્ન/જન્મ પુરાવા (સંબંધ સાબિત કરવા)"],
      hi: ["मृत्यु प्रमाणपत्र", "पेढ़ीनामा (वारिसों की सूची) — शपथपत्र सहित", "मृतक के नाम का 7/12 / प्रॉपर्टी कार्ड", "सभी वारिसों के आधार", "विवाह/जन्म प्रमाण (संबंध सिद्ध करने हेतु)"],
      en: ["Death certificate", "Pedhinamu (family tree of heirs) with affidavit", "7/12 / property card in the deceased's name", "Aadhaar of all heirs", "Marriage/birth proofs (to establish relationships)"],
    },
    fees: { gu: "નોંધ મફત; સોગંદનામું/નોટરી ₹100–300", hi: "एंट्री मुफ़्त; शपथपत्र/नोटरी ₹100–300", en: "Entry is free; affidavit/notary ₹100–300" },
    time: { gu: "30–90 દિવસ (વાંધા ન આવે તો)", hi: "30–90 दिन (आपत्ति न आए तो)", en: "30–90 days (if no objection)" },
    office: {
      gu: "i-ORA પોર્ટલ (iora.gujarat.gov.in) અથવા તલાટી/મામલતદાર કચેરી",
      hi: "i-ORA पोर्टल (iora.gujarat.gov.in) या तलाटी/मामलतदार कार्यालय",
      en: "i-ORA portal (iora.gujarat.gov.in) or the Talati/Mamlatdar office",
    },
    steps: {
      gu: [
        "પહેલા મરણનો દાખલો અને બધા વારસદારોના આધાર ભેગા કરો.",
        "પેઢીનામું બનાવો — કોણ કોણ કાયદેસર વારસદાર છે તેની સોગંદનામા સાથેની યાદી.",
        "i-ORA પર 'Varsai Entry' અરજી કરો અથવા તલાટી પાસે ફોર્મ ભરો.",
        "તલાટી નોંધ પાડી 135-D નોટિસ કાઢે — 30 દિવસ વાંધા માટે.",
        "વાંધો ન આવે તો મામલતદાર નોંધ મંજૂર કરે; નવો ૭/૧૨ વારસદારોના નામે.",
        "કોઈ વારસદાર હક છોડવા માંગે તો 'હક કમી' (release deed) નોંધણી કરાવવી પડે — આ કિસ્સામાં સલાહ જરૂર લો.",
      ],
      hi: [
        "पहले मृत्यु प्रमाणपत्र और सभी वारिसों के आधार इकट्ठा करें।",
        "पेढ़ीनामा बनाएँ — क़ानूनी वारिसों की शपथपत्र सहित सूची।",
        "i-ORA पर 'Varsai Entry' आवेदन करें या तलाटी के पास फॉर्म भरें।",
        "तलाटी एंट्री कर 135-D नोटिस निकालते हैं — 30 दिन आपत्ति के लिए।",
        "आपत्ति न आए तो मामलतदार एंट्री मंज़ूर करते हैं; नया 7/12 वारिसों के नाम।",
        "कोई वारिस हक़ छोड़ना चाहे तो 'हक़ कमी' (release deed) पंजीकृत करानी पड़ती है — ऐसे में सलाह ज़रूर लें।",
      ],
      en: [
        "First gather the death certificate and every heir's Aadhaar.",
        "Prepare the pedhinamu — an affidavit-backed family tree of legal heirs.",
        "Apply for 'Varsai Entry' on i-ORA or file the form with the Talati.",
        "The Talati records the entry and issues a 135-D notice — 30 days for objections.",
        "If unopposed, the Mamlatdar approves; a fresh 7/12 is issued in the heirs' names.",
        "If an heir wants to relinquish their share, a registered release deed ('hak kami') is needed — definitely take advice in that case.",
      ],
    },
    faqs: [
      {
        q: { gu: "વસિયત હોય તો?", hi: "वसीयत हो तो?", en: "What if there is a will?" },
        a: { gu: "નોંધાયેલ વસિયત હોય તો વારસાઈ તેના આધારે થાય; વિવાદ હોય તો કોર્ટ પ્રોબેટની જરૂર પડી શકે.", hi: "पंजीकृत वसीयत हो तो वारसाई उसी आधार पर होती है; विवाद हो तो कोर्ट प्रोबेट लग सकता है।", en: "A registered will governs the entry; if disputed, court probate may be required." },
      },
    ],
  },
  {
    slug: "widow-pension-gujarat",
    category: "welfare",
    emoji: "🤝",
    title: {
      gu: "ગંગા સ્વરૂપા યોજના — વિધવા સહાય ₹1,250/મહિનો",
      hi: "गंगा स्वरूपा योजना — विधवा सहायता ₹1,250/माह",
      en: "Ganga Swarupa Yojana — widow support of ₹1,250/month",
    },
    intro: {
      gu: "ગુજરાત સરકાર વિધવા બહેનોને દર મહિને ₹1,250 સીધા બેંક ખાતામાં આપે છે (ગંગા સ્વરૂપા આર્થિક સહાય યોજના). ઘણી હકદાર બહેનોને ખબર જ નથી કે આ એમનો હક છે.",
      hi: "गुजरात सरकार विधवा बहनों को हर माह ₹1,250 सीधे बैंक खाते में देती है (गंगा स्वरूपा आर्थिक सहायता योजना)। कई हक़दार बहनों को पता ही नहीं कि यह उनका हक़ है।",
      en: "The Gujarat government pays widowed women ₹1,250/month directly into their bank account (Ganga Swarupa financial assistance scheme). Many eligible women simply don't know this is their right.",
    },
    documents: {
      gu: ["પતિના મરણનો દાખલો", "અરજદારનું આધાર + બેંક પાસબુક", "આવકનો દાખલો (ગ્રામ્ય ₹1.20 લાખ / શહેરી ₹1.50 લાખ સુધી)", "રેશન કાર્ડ", "પાસપોર્ટ ફોટો"],
      hi: ["पति का मृत्यु प्रमाणपत्र", "आवेदिका का आधार + बैंक पासबुक", "आय प्रमाणपत्र (ग्रामीण ₹1.20 लाख / शहरी ₹1.50 लाख तक)", "राशन कार्ड", "पासपोर्ट फोटो"],
      en: ["Husband's death certificate", "Applicant's Aadhaar + bank passbook", "Income certificate (rural up to ₹1.20L / urban ₹1.50L)", "Ration card", "Passport photo"],
    },
    fees: { gu: "મફત", hi: "मुफ़्त", en: "Free" },
    time: { gu: "30–60 દિવસમાં મંજૂરી, પછી દર મહિને DBT", hi: "30–60 दिन में मंज़ूरी, फिर हर माह DBT", en: "Approved in 30–60 days, then monthly DBT" },
    office: digitalGujarat,
    steps: {
      gu: [
        "પહેલા મરણનો દાખલો અને આવકનો દાખલો તૈયાર કરો (ઉપરની માર્ગદર્શિકા જુઓ).",
        "ડિજિટલ ગુજરાત પર 'Ganga Swarupa' યોજના હેઠળ અરજી કરો કે મામલતદાર કચેરીએ ફોર્મ ભરો.",
        "બેંક ખાતું આધાર સાથે લિંક (DBT enabled) છે તેની ખાતરી કરો.",
        "મંજૂરી બાદ દર મહિનાની 1 તારીખ આસપાસ સહાય ખાતામાં જમા થાય.",
        "કોઈ પણ તબક્કે અટકે તો દિલીપસિંહ ભાઈની ઓફિસે આવો — આ સેવા સંપૂર્ણ મફત છે.",
      ],
      hi: [
        "पहले मृत्यु प्रमाणपत्र और आय प्रमाणपत्र तैयार करें (ऊपर की गाइड देखें)।",
        "डिजिटल गुजरात पर 'Ganga Swarupa' योजना में आवेदन करें या मामलतदार कार्यालय में फॉर्म भरें।",
        "बैंक खाता आधार से लिंक (DBT enabled) है, यह सुनिश्चित करें।",
        "मंज़ूरी के बाद हर माह की 1 तारीख़ के आसपास सहायता खाते में आती है।",
        "किसी भी चरण में अटकें तो दिलीपसिंह भाई के कार्यालय आएँ — यह सेवा पूरी तरह मुफ़्त है।",
      ],
      en: [
        "First prepare the death certificate and income certificate (see the guides above).",
        "Apply under 'Ganga Swarupa' on Digital Gujarat or file the form at the Mamlatdar office.",
        "Make sure the bank account is Aadhaar-linked (DBT enabled).",
        "Once approved, the amount credits around the 1st of every month.",
        "Stuck at any stage? Come to Dilipsingh bhai's office — this help is completely free.",
      ],
    },
    faqs: [],
  },
  {
    slug: "ayushman-card-gujarat",
    category: "welfare",
    emoji: "🏥",
    title: {
      gu: "આયુષ્માન કાર્ડ (PMJAY-MA) — ₹10 લાખ સુધી મફત સારવાર",
      hi: "आयुष्मान कार्ड (PMJAY-MA) — ₹10 लाख तक मुफ़्त इलाज",
      en: "Ayushman card (PMJAY-MA) — free treatment up to ₹10 lakh",
    },
    intro: {
      gu: "PMJAY-MA યોજના હેઠળ પાત્ર પરિવારને વર્ષે ₹10 લાખ સુધીની કેશલેસ સારવાર — ગુજરાતની ખાનગી હોસ્પિટલોમાં પણ. કાર્ડ કઢાવવું 20 મિનિટનું કામ છે.",
      hi: "PMJAY-MA योजना के तहत पात्र परिवार को साल में ₹10 लाख तक कैशलेस इलाज — गुजरात के निजी अस्पतालों में भी। कार्ड बनवाना 20 मिनट का काम है।",
      en: "Under PMJAY-MA, eligible families get cashless treatment up to ₹10 lakh/year — including at private hospitals in Gujarat. Getting the card takes 20 minutes.",
    },
    documents: {
      gu: ["આધાર કાર્ડ", "રેશન કાર્ડ", "મોબાઇલ નંબર"],
      hi: ["आधार कार्ड", "राशन कार्ड", "मोबाइल नंबर"],
      en: ["Aadhaar card", "Ration card", "Mobile number"],
    },
    fees: { gu: "મફત", hi: "मुफ़्त", en: "Free" },
    time: { gu: "પાત્રતા હોય તો તરત — કાર્ડ એ જ દિવસે", hi: "पात्रता हो तो तुरंत — कार्ड उसी दिन", en: "Instant if eligible — card the same day" },
    office: {
      gu: "beneficiary.nha.gov.in પર જાતે, અથવા આયુષ્માન મિત્ર/CSC કેન્દ્ર, નવસારી",
      hi: "beneficiary.nha.gov.in पर स्वयं, या आयुष्मान मित्र/CSC केंद्र, नवसारी",
      en: "Self-service at beneficiary.nha.gov.in, or an Ayushman Mitra/CSC centre in Navsari",
    },
    steps: {
      gu: [
        "beneficiary.nha.gov.in ખોલી મોબાઇલ OTPથી લોગિન કરો.",
        "રાજ્ય ગુજરાત + 'PMJAY' યોજના પસંદ કરી આધાર/રેશન કાર્ડથી પરિવાર શોધો.",
        "યાદીમાં નામ હોય તો e-KYC (ફેસ/OTP) કરો — દરેક સભ્યનું અલગ.",
        "મંજૂરી બાદ કાર્ડ PDF ડાઉનલોડ કરો.",
        "નામ યાદીમાં ન હોય તો રેશન કાર્ડ આધારે ઉમેરાવા મામલતદાર/CSCમાં અરજી કરો.",
      ],
      hi: [
        "beneficiary.nha.gov.in खोलकर मोबाइल OTP से लॉगिन करें।",
        "राज्य गुजरात + 'PMJAY' योजना चुनकर आधार/राशन कार्ड से परिवार खोजें।",
        "सूची में नाम हो तो e-KYC (फेस/OTP) करें — हर सदस्य का अलग।",
        "मंज़ूरी के बाद कार्ड PDF डाउनलोड करें।",
        "नाम सूची में न हो तो राशन कार्ड के आधार पर जुड़वाने हेतु मामलतदार/CSC में आवेदन करें।",
      ],
      en: [
        "Open beneficiary.nha.gov.in and log in with mobile OTP.",
        "Select state Gujarat + scheme 'PMJAY', search your family by Aadhaar/ration card.",
        "If listed, complete e-KYC (face/OTP) — separately for each member.",
        "Download the card PDF after approval.",
        "If not listed, apply at the Mamlatdar/CSC to be added based on your ration card.",
      ],
    },
    faqs: [],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export const guideCategories: { key: Guide["category"]; label: L10n }[] = [
  { key: "identity", label: { gu: "ઓળખના દસ્તાવેજ", hi: "पहचान दस्तावेज़", en: "Identity documents" } },
  { key: "certificate", label: { gu: "દાખલા-પ્રમાણપત્રો", hi: "प्रमाणपत्र", en: "Certificates" } },
  { key: "property", label: { gu: "મિલકત-જમીન", hi: "संपत्ति-ज़मीन", en: "Property & land" } },
  { key: "welfare", label: { gu: "સરકારી યોજનાઓ", hi: "सरकारी योजनाएँ", en: "Welfare schemes" } },
];
