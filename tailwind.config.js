/* global module */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      Satoshi12px: ["Satoshi12px"],
      Satoshi14px: ["Satoshi14px", "Helvetica", "Arial", "sans-serif"],
      Satoshi16px: ["Satoshi16px", "Helvetica", "Arial", "sans-serif"],
      Satoshi20px: ["Satoshi20px", "Helvetica", "Arial", "sans-serif"],
      Satoshi24px: ["Satoshi", "Helvetica", "Arial", "sans-serif"],
    },
    colors: {
      ...defaultTheme.colors,
      green: {
        100: "#E5FFF1",
        200: "#BFFFE3",
        300: "#A3FFD7",
        400: "#94FFD1",
        500: "#81FFC4",
        600: "#6AFFBE",
        700: "#50FFB2",
        800: "#3FFFAC",
        900: "#008000",     
      },
      red: {
        50: "#FFEBEC",
        100: "#FFD4D5",
        200: "#FFB9BB",
        300: "#FF707E",
        400: "#FF5B6A", // Intermediate shade
        500: "#FF4656", // Primary red shade
        600: "#dc062b",
        700: "#A4000E",
        800: "#70000B",
        900: "#4C0007",
      },
      gray: {
        50: "#F4F4F4",
        100: "#E8E8E8",
        200: "#D6D6D6",
        300: "#B8B8B8",
        400: "#9E9E9E",
        600: "#696969",
        800: "#383838",
        900: "#212121",
      },
      black: {
        50: "#0000000F",
        100: "#000000",
      },
      indigo: {
        300: "#8583EC",
        400: "#5957E5",
      },
      yellow: {
        500: "#FFCE0A",
        600: "#D1A700",
        900: "#423500",
      },
      teal: {
        50: "#bbdefb",
        100: "#90caf9",
        200: "#64b5f6",
        300: "#42a5f5",
        400: "#2196f3",
        500: "#008cff",
        600: "#1e88e5",
        800: "#005070",
        900: "#002F42",
      },
      white: {
        0: "#00000000",
        30: "#FFFFFF1E",
        100: "#FFFFFF",
      },
      custom: {
        100: "#29a87400",
        200: "#29a87452",
        300: "#12df85",
      },
    },
    extend: {
      animation: {
        fadeIn: "fadeIn 2s ease-in-out",
        translate: "translateY 1s ease-in-out",
      },
      keyframes: (theme) => ({
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        translateY: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50px)" },
        },
      }),
      transitionProperty: {
        transform: "transform",
      },
    },
  },
  plugins: [],
};
