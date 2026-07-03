import { site, yearsOfService } from "@/lib/site";

/** Site-wide structured data: the man, the business, the services. */
export function GlobalJsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    jobTitle: "Real Estate Agent, LIC Agent & Municipal Corporator",
    image: `${site.url}/images/portrait.webp`,
    url: site.url,
    telephone: `+${site.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: `${site.address.locality}, ${site.address.city}`,
      addressRegion: site.address.state,
      postalCode: site.address.pin,
      addressCountry: "IN",
    },
    sameAs: [site.justdial],
  };

  const business = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "InsuranceAgency", "LocalBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.tagline.en,
    image: `${site.url}/images/portrait.webp`,
    url: site.url,
    telephone: `+${site.phone}`,
    foundingDate: String(site.established),
    slogan: `Trusted in Navsari for ${yearsOfService()}+ years`,
    address: person.address,
    areaServed: [
      { "@type": "City", name: "Navsari" },
      { "@type": "Place", name: "Vijalpore" },
      { "@type": "Place", name: "Jalalpore" },
    ],
    knowsLanguage: ["gu", "hi", "en"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "20:00",
    },
    founder: { "@id": `${site.url}/#person` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Real estate advisory — plots, bungalows, flats, rentals in Navsari" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "LIC life insurance plans and claim assistance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Free government document assistance (Aadhaar, PAN, certificates)" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ward civic issue resolution — Navsari Vijalpore Municipality" } },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
    </>
  );
}
