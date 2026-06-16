/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b91c1c",   // rich red
        secondary: "#fef2f2", // soft rose background
        accent: "#ef4444",    // lighter red
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
