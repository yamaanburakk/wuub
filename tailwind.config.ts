import tailwindcssAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./docs/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wuub: {
          orange: "#F64D06",
          gray: "#A1A1A0",
          white: "#ECECE7",
          black: "#2B2B2C",
        },
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      borderRadius: {
        xl: "1rem",
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        glow: "0 20px 45px -15px rgba(246, 77, 6, 0.35)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;

