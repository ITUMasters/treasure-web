/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        green: "#30B526",
        orange: "#FF950F",
        red: "#E8311A",
        blue: "#0095E0",
        lightPurple: "#5B3DF6",
        darkPurple: "#02153A",
      },
    },
  },
  plugins: [],
};
