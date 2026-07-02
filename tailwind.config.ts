import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#181411",
          soft: "#2A241F",
          mute: "#6B6259",
        },
        paper: {
          DEFAULT: "#FAF7F1",
          warm: "#F3EDE3",
          deep: "#EAE1D3",
        },
        gold: {
          DEFAULT: "#B8863B",
          light: "#D9B87A",
          dark: "#8F6725",
        },
        clay: {
          DEFAULT: "#C4593A",
          soft: "#E8C3B5",
        },
        sage: {
          DEFAULT: "#7A8B6F",
          soft: "#D6DDCD",
        },
        plum: {
          DEFAULT: "#5C4560",
          soft: "#D9CCDC",
        },
        ocean: {
          DEFAULT: "#3E5C6B",
          soft: "#C9D8DF",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(24,20,17,0.05), 0 8px 24px rgba(24,20,17,0.07)",
        lift: "0 2px 4px rgba(24,20,17,0.06), 0 16px 40px rgba(24,20,17,0.14)",
        glow: "0 0 0 1px rgba(184,134,59,0.25), 0 12px 32px rgba(184,134,59,0.18)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        marquee: "marquee 32s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
