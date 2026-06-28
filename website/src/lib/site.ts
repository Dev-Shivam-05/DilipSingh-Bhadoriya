export const site = {
  name: "Dilipsingh Bhadoriya",
  nameGu: "દિલીપસિંહ ભદોરિયા",
  nameHi: "दिलीपसिंह भदौरिया",
  tagline: {
    en: "Navsari's one man for property, protection & paperwork — trusted since 2007.",
    gu: "મિલકત, વીમો અને સરકારી કામકાજ — નવસારીનો એક વિશ્વાસુ ચહેરો, ૨૦૦૭થી.",
    hi: "संपत्ति, बीमा और सरकारी कामकाज — नवसारी का एक भरोसेमंद चेहरा, 2007 से।",
  },
  phone: "919033964776",
  phoneDisplay: "+91 90339 64776",
  email: "contact@dilipsinghbhadoriya.com",
  address: {
    street: "Jai Shaktinagar Society, Near Shivaji Chowk, Ramnagar",
    locality: "Vijalpore",
    city: "Navsari",
    state: "Gujarat",
    pin: "396445",
  },
  established: 2007,
  justdial:
    "https://www.justdial.com/Navsari/Dilipsingh-Bhadoriya-Vijalpore/9999P2637-2637-170728105657-X8T8_BZDET",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dilipsinghbhadoriya.vercel.app",
};

export function yearsOfService() {
  return new Date().getFullYear() - site.established;
}

/** WhatsApp deep link with prefilled, context-aware message */
export function wa(message: string) {
  return `https://wa.me/${site.phone}?text=${encodeURIComponent(message)}`;
}
