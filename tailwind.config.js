/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6236ff",
          light: "#D8CFFF",
          dark: "#4b24d6",
        },
        secondary: {
          DEFAULT: "#f4edff",
          light: "#faf7ff",
          dark: "#e6dbff",
        },
        accent: {
          DEFAULT: "#ffa938",
          light: "#ffbe63",
          dark: "#e6911f",
        },

        success: "#16a34a",
        danger: "#dc2626",
        warning: "#f59e0b",
        info: "#0891b2",

        background: "#F9FAFC",
        surface: "#f9fafb",
        light: "#EFEFF2",
        dark: "#00000F",
        text: "#44444F",
        muted: "#92929D",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
