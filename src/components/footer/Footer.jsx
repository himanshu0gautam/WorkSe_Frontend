import { useEffect, useRef, useState } from "react";
import Wicon from '../../../public/w.svg'

/* ---------- Edit these ---------- */
const BRAND = { first: "Work", second: "Se", startYear: 2026 };

const LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];

const SOCIALS = [
  { name: "Facebook", href: "#", color: "#1D4ED8" },
  { name: "Twitter", href: "#", color: "#1DA1F2" },
  { name: "LinkedIn", href: "#", color: "#0A66C2" },
  { name: "Instagram", href: "#", color: "#E1306C" },
  { name: "YouTube", href: "#", color: "#1D4ED8" },
];

const ACCENT = "#D99416";
// Uses your theme variable if it exists (dark mode ready), else the light lavender fallback
const SOFT = "rgb(var(--bg-soft, 244 243 248))";

/* ---------- Tiny animation helpers (no extra libraries) ---------- */
const css = `
@keyframes kf-wave-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.kf-wave { animation: kf-wave-float 7s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .kf-wave { animation: none; } }
`;

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function SocialIcon({ name, color }) {
  const common = { viewBox: "0 0 24 24", className: "h-[18px] w-[18px]", "aria-hidden": true };
  switch (name) {
    case "Facebook":
      return (
        <svg {...common} fill={color}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg {...common} fill={color}>
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...common} fill={color}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "Instagram":
      return (
        <svg {...common} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="1" y="4" width="22" height="16" rx="5" fill={color} />
          <polygon points="10 8.8 16 12 10 15.2" fill="#fff" />
        </svg>
      );
  }
}

/* ---------- Footer ---------- */
export default function Footer() {
  const [ref, seen] = useInView();
  const year = new Date().getFullYear();
  const years = year > BRAND.startYear ? `${BRAND.startYear}–${year}` : `${year}`;

  // fade-up on scroll, staggered by index
  const reveal = (i = 0) => ({
    className: `transition-all duration-700 ease-out motion-reduce:transition-none ${
      seen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    }`,
    style: { transitionDelay: seen ? `${i * 80}ms` : "0ms" },
  });

  return (
    <footer ref={ref} className="relative overflow-hidden">
      <style>{css}</style>

      {/* Wavy top edge (back layer floats gently) */}
      <div className="relative h-16 sm:h-24 lg:h-36" aria-hidden="true">
        <svg className="kf-wave absolute inset-0 h-full w-full opacity-50" viewBox="0 0 1440 190" preserveAspectRatio="none">
          <path
            d="M0 150 C150 60 300 40 500 70 C700 100 850 150 1050 120 C1250 90 1350 30 1440 20 L1440 190 L0 190 Z"
            fill={SOFT}
          />
        </svg>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 190" preserveAspectRatio="none">
          <path
            d="M0 183 C110 100 230 14 353 14 C520 14 700 135 864 135 C1000 135 1100 0 1239 0 C1330 0 1400 20 1440 50 L1440 190 L0 190 Z"
            fill={SOFT}
          />
        </svg>
      </div>

      <div className="-mt-px" style={{ backgroundColor: SOFT }}>
        <div className="mx-auto max-w-[1640px] px-6 sm:px-10">
          {/* Row 1: logo + links */}
          <div className="flex flex-col items-center gap-5 pb-6 md:flex-row md:justify-between">
            <div {...reveal(0)}>
              <a href="/" className="group flex items-center gap-3" aria-label={`${BRAND.first} ${BRAND.second} home`}>
                 <img src={Wicon} alt="" />
                <div className="flex flex-col pt-4">
                  <span className="text-2xl font-extrabold tracking-tight sm:text-[28px]">
                  {BRAND.first} <span style={{ color: ACCENT }}>{BRAND.second}</span>
                </span>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Connecting households & businesses directly with local artisans with zero brokerage fees.
              </p>
                </div>
              </a>
            </div>

            <nav aria-label="Footer">
              <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                {LINKS.map((l, i) => (
                  <li key={l.label} {...reveal(i + 1)}>
                    <a
                      href={l.href}
                      className="relative text-[15px] transition-colors duration-200 hover:text-[#D99416] sm:text-base after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#D99416] after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Row 2: copyright + socials */}
          <div className="flex flex-col items-center gap-4 border-t border-slate-200 py-5 md:flex-row md:justify-between">
            <p {...reveal(6)} className={`text-center text-[15px]  sm:text-base ${reveal(6).className}`}>
              © {years}{" "}
              <span className="font-bold" style={{ color: ACCENT }}>
                {BRAND.first}
                {BRAND.second}
              </span>
              <span className="text-slate-400">™</span>. All Rights Reserved. 
              {/* <span>Direct Karigar Network.</span> */}
            </p>

            <ul className="flex items-center gap-3">
              {SOCIALS.map((s, i) => (
                <li key={s.name} {...reveal(i + 7)}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-md"
                  >
                    <SocialIcon name={s.name} color={s.color} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}