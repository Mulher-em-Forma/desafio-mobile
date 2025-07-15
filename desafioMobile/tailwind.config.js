/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        primary: "#A244E3",
        secondary: "#EAA907",
        terciary: "#F97316",
        destructive: "#F04437",
        error: "#F04437",
        border: "#E4E7EC",
        warning: "#F97316",
        info: "#2970FE",
        success: "#17B169",
      }
    },
  },
  plugins: [],
}