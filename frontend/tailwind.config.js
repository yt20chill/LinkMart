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
          100: "hsl(214deg,100%,90%)",
          200: "hsl(214deg,100%,80%)",
          300: "hsl(214deg,100%,70%)",
          400: "hsl(214deg,100%,60%)",
          500: "hsl(214deg,100%,50%)",
          600: "hsl(214deg,100%,40%)",
          700: "hsl(214deg,100%,30%)",
          800: "hsl(214deg,100%,20%)",
          900: "hsl(214deg,100%,10%)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        // accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        // },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
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
