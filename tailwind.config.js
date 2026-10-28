/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      backgroundColor: {
        white: v("--surface"),
        slate: { 50: v("--bg"), 100: v("--bg-soft"), 200: v("--line") },
      },
      borderColor: {
        slate: { 100: v("--line-soft"), 200: v("--line"), 300: v("--line-strong") },
      },
      divideColor: {
        slate: { 100: v("--line-soft"), 200: v("--line") },
      },
      textColor: {
        slate: {
          50: v("--heading"),
          100: v("--heading"),
          200: v("--secondary"),
          300: v("--secondary"),
          400: v("--faint"),
          500: v("--secondary"),
          600: v("--body"),
          700: v("--body"),
          800: v("--heading"),
          900: v("--heading"),
        },
      },
    },
  },
};

