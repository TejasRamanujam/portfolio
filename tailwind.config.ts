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
        "ide-black": "#000000",
        "exec-green": "#00FF00",
        "syntax-white": "#F5F5F5",
        "logic-blue": "#1565C0",
        "wireframe-grey": "#B0BEC5",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanline": "scanline 3s ease-in-out infinite",
        "fade-in": "fadeIn 3s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
      },
      keyframes: {
        scanline: {
          "0%, 100%": { top: "0%" },
          "50%": { top: "100%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
