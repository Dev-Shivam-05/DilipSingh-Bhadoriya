import type { Metadata } from "next";
import Link from "next/link";
import { Hind_Vadodara, Baloo_2 } from "next/font/google";
import { isAdmin } from "@/lib/adminAuth";
import { loginAction, logoutAction } from "./actions";
import { Seal } from "@/components/brand/Seal";
import { Icon, type IconName } from "@/components/ui/icons";
import "../globals.css";

const hind = Hind_Vadodara({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-hind" });
const baloo = Baloo_2({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-baloo" });

export const metadata: Metadata = {
  title: "Admin — Dilipsingh Bhadoriya",
  robots: { index: false, follow: false },
};

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin", label: "Dashboard", icon: "chartBar" },
  { href: "/admin/listings", label: "Listings", icon: "home" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "inbox" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "star" },
  { href: "/admin/seva", label: "Seva Requests", icon: "fileText" },
  { href: "/admin/civic", label: "Civic Issues", icon: "landmark" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAdmin();

  return (
    <html lang="en" className={`${hind.variable} ${baloo.variable}`}>
      <body className="min-h-screen bg-ink-50">
        {!authed ? (
          <main className="flex min-h-screen items-center justify-center p-4">
            <form action={loginAction} className="w-full max-w-sm rounded-3xl border border-ink-800/10 bg-white p-8 text-center shadow-seal">
              <Seal size={64} className="mx-auto" />
              <h1 className="mt-4 font-display text-xl font-bold text-ink-800">Family Admin</h1>
              <p className="mt-1 text-sm text-ink-700/60">Dilipsingh Bhadoriya — control room</p>
              <input
                type="text"
                name="username"
                required
                autoComplete="username"
                placeholder="Username"
                className="mt-6 w-full rounded-xl border border-ink-800/20 px-4 py-3 outline-none focus:border-gold-500"
              />
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="Password"
                className="mt-3 w-full rounded-xl border border-ink-800/20 px-4 py-3 outline-none focus:border-gold-500"
              />
              <button className="mt-4 w-full rounded-full bg-ink-800 py-3 font-semibold text-paper hover:bg-ink-700">
                Enter →
              </button>
            </form>
          </main>
        ) : (
          <div className="flex min-h-screen">
            <aside className="hidden w-56 shrink-0 flex-col border-r border-ink-800/10 bg-ink-900 p-4 text-paper md:flex">
              <div className="mb-6 flex items-center gap-2 px-2">
                <Seal size={36} tone="gold" />
                <p className="text-sm font-bold">Admin</p>
              </div>
              <nav className="flex flex-1 flex-col gap-1">
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href} className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm hover:bg-ink-800">
                    <Icon name={n.icon} className="h-4 w-4 text-gold-400" /> {n.label}
                  </Link>
                ))}
              </nav>
              <form action={logoutAction}>
                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-paper/20 px-3 py-2 text-sm hover:bg-ink-800">
                  <Icon name="logout" className="h-4 w-4" /> Logout
                </button>
              </form>
            </aside>
            <div className="flex-1">
              <nav className="flex gap-2 overflow-x-auto border-b border-ink-800/10 bg-ink-900 p-2 text-paper md:hidden">
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href} className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs hover:bg-ink-800">
                    <Icon name={n.icon} className="h-3.5 w-3.5 text-gold-400" /> {n.label}
                  </Link>
                ))}
              </nav>
              <main className="p-4 md:p-8">{children}</main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
