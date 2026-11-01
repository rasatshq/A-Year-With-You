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
        cream: {
          50: "#FCF9F6",
          100: "#F8EDEB", // Warm Cream
          200: "#F2DFDC",
          300: "#EAD0CB",
          paper: "#FAF7F5",
        },
        blush: {
          50: "#FDF4F4",
          100: "#F7E4E5",
          200: "#EBCFD0", // Blush Pink
          300: "#DEAAB0",
          400: "#D38C94",
        },
        rose: {
          300: "#DDA2A7",
          400: "#C98F94", // Dusty Rose
          500: "#B8757C",
          600: "#9E5961",
        },
        brown: {
          400: "#8F676D",
          500: "#79545A", // Muted Brown
          600: "#634147",
        },
        cocoa: {
          700: "#5A3E45",
          800: "#49353B", // Deep Cocoa
          900: "#38252A",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dmsans)", "system-ui", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        polaroid: "0 10px 25px -5px rgba(73, 53, 59, 0.1), 0 8px 10px -6px rgba(73, 53, 59, 0.06)",
        'polaroid-hover': "0 20px 35px -5px rgba(73, 53, 59, 0.18), 0 10px 15px -5px rgba(73, 53, 59, 0.1)",
        soft: "0 4px 20px -2px rgba(121, 84, 90, 0.08)",
        envelope: "0 15px 35px -10px rgba(73, 53, 59, 0.15)",
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
