import type { ComponentProps } from "react";

/**
 * In-house stroke icon set (24×24 grid, 2px stroke, round caps) — replaces all
 * emoji glyphs so the UI renders identically on every device and OS.
 */

const PATHS: Record<string, React.ReactNode> = {
  home: (
    <path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" />
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 7h2m4 0h2M8 11h2m4 0h2M8 15h2m4 0h2M10 21v-3h4v3" />
    </>
  ),
  store: (
    <>
      <path d="M3 9 5 4h14l2 5M3 9h18M5 9v11h14V9" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  key: (
    <>
      <circle cx="7.5" cy="15.5" r="3.5" />
      <path d="m10.2 12.8 9.8-9.8M16 7l3 3" />
    </>
  ),
  map: (
    <>
      <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2Z" />
      <path d="M9 4v14m6-12v14" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6Z" />
      <path d="m9 11.5 2 2 4-4" />
    </>
  ),
  fileText: (
    <>
      <path d="M6 3h8l4 4v14H6Z" />
      <path d="M14 3v4h4M9 12h6m-6 4h6" />
    </>
  ),
  landmark: (
    <>
      <path d="M3 21h18M5 18v-7m4.5 7v-7m5 7v-7m4.5 7v-7M3 9h18L12 3Z" />
    </>
  ),
  check: <path d="m4 12.5 5 5L20 6.5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  listChecks: (
    <path d="m3 6 1.5 1.5L7 5M3 12l1.5 1.5L7 11m-4 7 1.5 1.5L7 17M10 6.5h11m-11 6h11m-11 6h11" />
  ),
  helpCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.35-1 .95-1 1.7M12 16.5h.01" />
    </>
  ),
  clipboardCheck: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="m9 13.5 2 2 4-4" />
    </>
  ),
  banknote: (
    <>
      <rect x="2" y="7" width="20" height="10" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01m11.99 0h.01" />
    </>
  ),
  receipt: (
    <>
      <path d="M5 2v20l2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M9 8h6m-6 4h6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  chartBar: <path d="M4 20h16M6 20v-6m6 6V6m6 14v-9" />,
  sprout: (
    <>
      <path d="M12 21v-7" />
      <path d="M12 14c0-4-3-6-7-6 0 4 3 6 7 6Z" />
      <path d="M12 12c0-3.5 2.5-5.5 6.5-5.5 0 3.5-2.5 5.5-6.5 5.5Z" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8.5 7h7M8.5 12h.01M12 12h.01m3.49 0h.01M8.5 16h.01M12 16h.01m3.49 0h.01" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M12 3a6 6 0 0 1 3.5 10.9c-.7.5-1 1.2-1 2.1h-5c0-.9-.3-1.6-1-2.1A6 6 0 0 1 12 3Z" />
      <path d="M9.5 19h5M10.5 21.5h3" />
    </>
  ),
  waves: (
    <path d="M2 7.5c1.5 1.5 3 1.5 4.75 0s3.25-1.5 4.75 0 3 1.5 4.75 0 3.25-1.5 4.75 0M2 13c1.5 1.5 3 1.5 4.75 0s3.25-1.5 4.75 0 3 1.5 4.75 0 3.25-1.5 4.75 0M2 18.5c1.5 1.5 3 1.5 4.75 0s3.25-1.5 4.75 0 3 1.5 4.75 0 3.25-1.5 4.75 0" />
  ),
  road: (
    <path d="M6 20 9 4m9 16L15 4M12 5v2.5m0 4v2.5m0 4V20" />
  ),
  droplet: (
    <path d="M12 3c3 4.5 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 3-6.5 6-11Z" />
  ),
  trash: (
    <path d="M4 6h16M6 6l1 15h10l1-15M9 6V4h6v2m-5 4v7m4-7v7" />
  ),
  clipboardList: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M9 12h.01M12 12h4M9 16h.01M12 16h4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.5 2.5-5.5 6-5.5s6 2 6 5.5" />
      <circle cx="17.5" cy="9.5" r="2.5" />
      <path d="M17.5 15c2.5.4 3.5 2.2 3.5 5" />
    </>
  ),
  share: (
    <>
      <circle cx="6" cy="12" r="2.2" />
      <circle cx="17.5" cy="5.5" r="2.2" />
      <circle cx="17.5" cy="18.5" r="2.2" />
      <path d="m8 11 7.5-4.5M8 13l7.5 4.5" />
    </>
  ),
  save: (
    <>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <path d="M17 21v-8H7v8M7 3v5h8" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  star: (
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z" />
  ),
  inbox: (
    <>
      <path d="M3 13l3.5-8h11L21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M3 13h5a4 4 0 0 0 8 0h5" />
    </>
  ),
  messageCircle: (
    <path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-13.4 7.8L3 21l1.2-4.6A9 9 0 0 1 12 3Z" />
  ),
  pointer: (
    <path d="M9 9l12 5-5.2 1.8L14 21 9 9ZM5 5l2 2M4 11h2.5M11 4v2.5" />
  ),
  smartphone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  alertCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5m0 3.5h.01" />
    </>
  ),
  idCard: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10.5" r="2" />
      <path d="M5.5 16c.6-1.6 5.4-1.6 6 0M14 9h4.5M14 13h4.5" />
    </>
  ),
  creditCard: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </>
  ),
  vote: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="m9 12 2 2 4.5-4.5" />
    </>
  ),
  baby: (
    <>
      <circle cx="12" cy="11" r="6.5" />
      <path d="M10 10h.01M14 10h.01M10 13.5c.8 1 3.2 1 4 0M12 4.5c.8-.9 2-.8 2.4 0" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  medicalCross: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  userCheck: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.5 2.5-5.5 6-5.5 1.4 0 2.6.3 3.6.9M15.5 17.5l2 2 4-4.5" />
    </>
  ),
  diamond: <path d="M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" />,
  arrowRight: <path d="M4 12h16m-6-6 6 6-6 6" />,
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 21h16" />,
  logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H9" />,
};

export type IconName = keyof typeof PATHS;
export const ICON_NAMES = Object.keys(PATHS) as IconName[];

export function Icon({
  name,
  className = "h-5 w-5",
  ...props
}: { name: IconName; className?: string } & ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
