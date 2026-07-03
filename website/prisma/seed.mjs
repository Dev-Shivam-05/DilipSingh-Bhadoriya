import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const listings = [
  { slug: "residential-plot-vijalpore-150", title: "Residential plot near Shivaji Chowk", titleGu: "શિવાજી ચોક પાસે રહેણાંક પ્લોટ", type: "plot", price: 3200000, areaSqft: 1500, locality: "Vijalpore", description: "Clear-title 1500 sq.ft residential plot in an established society, 2 min from Shivaji Chowk. Ready for construction, all documents verified.", descriptionGu: "શિવાજી ચોકથી ૨ મિનિટ, સ્થાપિત સોસાયટીમાં ક્લિયર ટાઇટલ ૧૫૦૦ ચો.ફૂટ પ્લોટ. બાંધકામ માટે તૈયાર, બધા દસ્તાવેજ ચકાસેલા.", featured: true, isSample: true, imageUrl: null },
  { slug: "2bhk-flat-ramnagar", title: "2BHK flat, Ramnagar", titleGu: "૨BHK ફ્લેટ, રામનગર", type: "flat", price: 2650000, areaSqft: 1050, bedrooms: 2, locality: "Ramnagar", description: "Well-maintained 2BHK on the 2nd floor with covered parking, borewell + municipal water. Family society.", descriptionGu: "બીજા માળે સારી રીતે જાળવેલો ૨BHK, કવર્ડ પાર્કિંગ, બોરવેલ + નગરપાલિકા પાણી. ફેમિલી સોસાયટી.", featured: true, isSample: true },
  { slug: "3bhk-bungalow-lunsikui", title: "3BHK bungalow, Lunsikui", titleGu: "૩BHK બંગલો, લુન્સીકુઈ", type: "bungalow", price: 8500000, areaSqft: 2200, bedrooms: 3, locality: "Lunsikui", description: "Corner bungalow with garden space in a prime Navsari locality. Ideal for a joint family.", descriptionGu: "નવસારીના પ્રાઇમ વિસ્તારમાં ગાર્ડન સ્પેસ સાથે કોર્નર બંગલો. સંયુક્ત પરિવાર માટે આદર્શ.", featured: true, isSample: true },
  { slug: "shop-station-road", title: "Shop on Station Road", titleGu: "સ્ટેશન રોડ પર દુકાન", type: "commercial", price: 4500000, areaSqft: 420, locality: "Station Road", description: "High-footfall commercial shop, ground floor, suitable for retail or office. Rental yield ~4.5%.", descriptionGu: "વધુ અવરજવરવાળી ગ્રાઉન્ડ ફ્લોર દુકાન, રિટેલ કે ઓફિસ માટે યોગ્ય. ભાડા વળતર ~૪.૫%.", isSample: true },
  { slug: "1bhk-rental-dudhia-talav", title: "1BHK for rent, Dudhia Talav", titleGu: "૧BHK ભાડે, દૂધિયા તળાવ", type: "rental", price: 8500, areaSqft: 650, bedrooms: 1, locality: "Dudhia Talav", description: "Clean 1BHK for a small family, ₹8,500/month + deposit. Near schools and market.", descriptionGu: "નાના પરિવાર માટે સ્વચ્છ ૧BHK, ₹૮,૫૦૦/માસ + ડિપોઝિટ. શાળા અને બજાર નજીક.", isSample: true },
  { slug: "agri-plot-jalalpore", title: "Agricultural land, Jalalpore", titleGu: "ખેતીની જમીન, જલાલપોર", type: "plot", price: 5200000, areaSqft: 10890, locality: "Jalalpore", description: "Quarter-acre agricultural parcel with road touch and canal irrigation. 7/12 clean.", descriptionGu: "રોડ ટચ અને કેનાલ સિંચાઈ સાથે પા એકર ખેતીની જમીન. ૭/૧૨ ચોખ્ખો.", isSample: true },
  { slug: "2bhk-flat-grid-road", title: "New 2BHK, Grid Road", titleGu: "નવો ૨BHK, ગ્રીડ રોડ", type: "flat", price: 3100000, areaSqft: 1150, bedrooms: 2, locality: "Grid", description: "Under-construction 2BHK with modern amenities, possession in 8 months. RERA registered project.", descriptionGu: "આધુનિક સુવિધાઓ સાથે નિર્માણાધીન ૨BHK, ૮ મહિનામાં કબજો. RERA રજિસ્ટર્ડ પ્રોજેક્ટ.", isSample: true },
  { slug: "sold-plot-vijalpore-demo", title: "Residential plot, Vijalpore (closed deal)", titleGu: "રહેણાંક પ્લોટ, વિજલપોર (સોદો પૂર્ણ)", type: "plot", price: 2800000, areaSqft: 1200, locality: "Vijalpore", status: "sold", description: "Closed in 12 days — both sides satisfied. This is how a clean deal looks.", descriptionGu: "૧૨ દિવસમાં સોદો પૂર્ણ — બંને પક્ષ સંતુષ્ટ. ચોખ્ખો સોદો આવો હોય.", isSample: true },
];

const testimonials = [
  { name: "Rameshbhai Patel", locality: "Vijalpore", service: "property", message: "અમારો પ્લોટનો સોદો ૧૫ દિવસમાં, એક પણ રૂપિયાની છુપી વાત વગર. દિલીપસિંહ ભાઈ એટલે ભરોસો.", approved: true },
  { name: "Meenaben Desai", locality: "Ramnagar", service: "documents", message: "વિધવા સહાય માટે બે વર્ષથી ધક્કા ખાતી હતી. ભાઈએ ૪૦ દિવસમાં મંજૂર કરાવી આપી — એક રૂપિયો લીધા વગર.", approved: true },
  { name: "Suresh Rathod", locality: "Lunsikui", service: "lic", message: "પિતાજીના LIC ક્લેમ વખતે અમે ભાંગી પડ્યા હતા. દિલીપસિંહ ભાઈ દરેક ઓફિસે અમારી સાથે આવ્યા. ૩ અઠવાડિયામાં ક્લેમ પાસ.", approved: true },
  { name: "Farida Shaikh", locality: "Station Road", service: "documents", message: "आधार में नाम की गलती 3 साल से अटकी थी। भाई ने एक हफ्ते में ठीक करवा दी। भगवान उन्हें सलामत रखे।", approved: true },
  { name: "Kiranbhai Tandel", locality: "Jalalpore", service: "property", message: "જમીનના ૭/૧૨માં જૂનો બોજો હતો જે અમને દેખાયો નહોતો. ભાઈએ સોદા પહેલાં પકડી પાડ્યો અને અમને લાખોના નુકસાનથી બચાવ્યા.", approved: true },
  { name: "Jayshree Naik", locality: "Vijalpore", service: "civic", message: "અમારી ગલીની સ્ટ્રીટલાઇટ ૬ મહિનાથી બંધ હતી. વોર્ડ બોર્ડ પર ફરિયાદ કરી — ૯ દિવસમાં નવી લાઇટ ચાલુ.", approved: true },
];

const sevaRequests = [
  { token: "DSB-1001", name: "Demo Request", phone: "9000000001", docType: "income-certificate", details: "Scholarship માટે", status: "done" },
  { token: "DSB-1002", name: "Demo Request", phone: "9000000002", docType: "varsai", details: "ખેતીની જમીન વારસાઈ", status: "in_progress" },
];

const civicIssues = [
  { token: "WARD-2001", name: "Jayshree Naik", phone: "9000000003", category: "streetlight", area: "Jai Shaktinagar, Lane 3", details: "Street light band chhe 2 aathvadiya thi", status: "resolved", note: "New LED fitted on 28 June." },
  { token: "WARD-2002", name: "Resident", phone: "9000000004", category: "drainage", area: "Ramnagar main road", details: "ગટર ઉભરાય છે, ચોમાસા પહેલાં સફાઈ જરૂરી", status: "in_progress", note: "Cleaning crew scheduled this week." },
  { token: "WARD-2003", name: "Resident", phone: "9000000005", category: "road", area: "Shivaji Chowk approach", details: "Potholes after rain", status: "received" },
];

async function main() {
  for (const l of listings) {
    await db.listing.upsert({ where: { slug: l.slug }, update: l, create: l });
  }
  const testimonialCount = await db.testimonial.count();
  if (testimonialCount === 0) await db.testimonial.createMany({ data: testimonials });
  for (const s of sevaRequests) {
    await db.sevaRequest.upsert({ where: { token: s.token }, update: s, create: s });
  }
  for (const c of civicIssues) {
    await db.civicIssue.upsert({ where: { token: c.token }, update: c, create: c });
  }
  console.log("Seeded:", { listings: listings.length, testimonials: testimonials.length });
}

main().finally(() => db.$disconnect());
