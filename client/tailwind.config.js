/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#f8f3eb",
          sand: "#e9dcc7",
          cocoa: "#795548",
          ink: "#1f2937",
          clay: "#c27b57"
        }
      },
      boxShadow: {
        soft: "0 20px 60px rgba(31, 41, 55, 0.12)"
      }
    }
  },
  plugins: []
};
