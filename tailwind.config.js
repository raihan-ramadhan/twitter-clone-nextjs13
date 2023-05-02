/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "500px",
      ...defaultTheme.screens,
    },
    extend: {
      // prettier-ignore
      colors: {
        'main-primary': 'rgb(var(--main-primary) / <alpha-value>)',
        'main-secondary': 'rgb(var(--main-secondary) / <alpha-value>)',
        'main-background-1': 'rgb(var(--main-background-1) / <alpha-value>)',
        'main-background-2': 'rgb(var(--main-background-2) / <alpha-value>)',
        'main-background-3': 'rgb(var(--main-background-3) / <alpha-value>)',
        'main-accent': 'rgb(var(--main-accent) / <alpha-value>)',
        'accent-yellow': 'rgb(var(--accent-yellow) / <alpha-value>)',
        'accent-blue': 'rgb(var(--accent-blue) / <alpha-value>)',
        'accent-pink': 'rgb(var(--accent-pink) / <alpha-value>)',
        'accent-purple': 'rgb(var(--accent-purple) / <alpha-value>)',
        'accent-orange': 'rgb(var(--accent-orange) / <alpha-value>)',
        'accent-green': 'rgb(var(--accent-green) / <alpha-value>)',
        'accent-red': '#F4212E',
        'dark-primary': '#E7E9EA',
        'dark-secondary': '#71767B',
        'light-primary': '#0F1419',
        'light-secondary': '#536471',
        'dark-border': '#2F3336',
        'light-border': '#EFF3F4',
        'dark-line-reply': '#333639',
        'light-line-reply': '#CFD9DE',
        'twitter-icon': '#FFFFFF',
        'image-preview-hover': '#272C30',
      },
      keyframes: {
        translateY1px: {
          "0%, 100%": { transform: "translateY(0px)" },
          "25%": { transform: "translateY(1px)" },
          "50%": { transform: "translateY(-1px)" },
          "75%": { transform: "translateY(1px)" },
        },
      },
      animation: {
        translateY1px: "translateY1px .1s ease-out",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar-hide"),
    ({ addVariant }) => {
      addVariant("inner", "& > *");
    },
  ],
};
