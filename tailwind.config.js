/** @type {import('tailwindcss').Config} */
const colors = require("./src/theme/theme").colors;
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensures Tailwind scans .tsx files
    theme: {
      extend: {
        colors:{...colors, }
      },
    },
    plugins: [],
  };
  