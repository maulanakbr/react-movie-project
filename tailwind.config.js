/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": {
          50: "#CBCBCB",
          100: "#C1C1C1",
          200: "#ADADAD",
          300: "#989898",
          400: "#848484",
          500: "#707070",
          600: "#5B5B5B",
          700: "#474747",
          800: "#323232",
          900: "#1E1E1E",
        },
      },
    },
  },
  plugins: [],
};
