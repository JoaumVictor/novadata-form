/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "ubuntu-bold": ["Ubuntu-Bold", "sans-serif"],
        default: ["Ubuntu-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
