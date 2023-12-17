/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          100: "hsl(347deg,77%,90%)",
          200: "hsl(347deg,77%,80%)",
          300: "hsl(347deg,77%,70%)",
          400: "hsl(347deg,77%,60%)",
          500: "hsl(347deg,77%,50%)",
          600: "hsl(347deg,77%,40%)",
          700: "hsl(347deg,77%,30%)",
          800: "hsl(347deg,77%,20%)",
          900: "hsl(347deg,77%,10%)",
        },
        secondary: {
          100: "hsl(243deg,75%,90%)",
          200: "hsl(243deg,75%,80%)",
          300: "hsl(243deg,75%,70%)",
          400: "hsl(243deg,75%,60%)",
          500: "hsl(243deg,75%,50%)",
          600: "hsl(243deg,75%,40%)",
          700: "hsl(243deg,75%,30%)",
          800: "hsl(243deg,75%,20%)",
          900: "hsl(243deg,75%,10%)",
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    // require("tailwindcss-animate"),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/forms"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#be123c",
          "primary-content": "#fff",
          accent: "#b75737",
          secondary: "#2dd4bf",
          success: "#6ee7b7",
          warning: "#fcd34d",
          error: "#be123c",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#be123c",
          "primary-content": "#fff",
          accent: "#b75737",
          secondary: "#2dd4bf",
          success: "#6ee7b7",
          warning: "#fcd34d",
          error: "#be123c",
        },
      },
    ],
  },
};
