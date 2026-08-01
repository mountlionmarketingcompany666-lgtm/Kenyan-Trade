/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: "#0B6B4F",
        forest: "#064E3B",
        gold: "#D4A72C",
        goldLight: "#F4E3A1",
        bgSoft: "#F8FAF9",
        textDark: "#17221E",
        textSub: "#64748B",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
