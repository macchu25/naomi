import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#07040d",
          900: "#0d0718",
          850: "#120a22",
          800: "#160e26",
          750: "#1a102e",
          700: "#22153c",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
      },
      keyframes: {
        floatOrb: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(40px, 30px) scale(1.1)" },
          "100%": { transform: "translate(-30px, -20px) scale(0.95)" },
        },
        rotateRing: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        counterRotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        pulseGlow: {
          "0%": { transform: "scale(0.95)", opacity: "0.5" },
          "100%": { transform: "scale(1.1)", opacity: "0.8" },
        },
        heartPulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.24)" },
        },
      },
      animation: {
        "float-orb-slow": "floatOrb 18s ease-in-out infinite alternate",
        "float-orb-mid": "floatOrb 22s ease-in-out -5s infinite alternate",
        "float-orb-deep": "floatOrb 26s ease-in-out -10s infinite alternate",
        "rotate-ring": "rotateRing 14s linear infinite",
        "counter-rotate": "counterRotate 14s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite alternate",
        "heart-pulse": "heartPulse 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
