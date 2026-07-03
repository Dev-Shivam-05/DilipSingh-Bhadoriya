import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API, admin, Next internals and static files
  matcher: "/((?!api|admin|_next|_vercel|.*\\..*).*)",
};
