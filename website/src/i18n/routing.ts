import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["gu", "hi", "en"],
  defaultLocale: "gu",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
