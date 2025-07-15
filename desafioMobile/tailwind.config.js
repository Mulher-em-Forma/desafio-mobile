/** @type {import('tailwindcss').Config} */
const { AppColors } = require('./constants/colors.js')

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: AppColors.background,
        primary: AppColors.primary,
        secondary: AppColors.secondary,
        terciary: AppColors.terciary,
        destructive: AppColors.destructive,
        error: AppColors.error,
        border: AppColors.border,
        muted: AppColors.muted,
        'muted-foreground': AppColors['muted-foreground'],
        warning: AppColors.warning,
        info: AppColors.info,
        success: AppColors.success,
      }
    },
  },
  plugins: [],
}