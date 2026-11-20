import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a5f",
        accent: "#e87722",
        background: "#f7f6f3",
        surface: "#ffffff",
        text: "#1f2937",
        success: "#16a34a",
        error: "#dc2626",
        border: "#e5e7eb",
      },
      borderRadius: {
        card: "12px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;