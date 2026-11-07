/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary Terracotta / Burnt Sienna Palette
        primary: {
          DEFAULT: "#c2652a",
          hover: "#a34e1c",
          container: "#e08850",
          fixed: "#fbe8d8",
          "fixed-dim": "#f0a878",
          dark: "#8a4518",
          light: "#fdf3eb",
        },
        // Secondary Charcoal Warm Slate
        secondary: {
          DEFAULT: "#78706a",
          container: "#eae2da",
          fixed: "#eae2da",
          "fixed-dim": "#cec6be",
          dark: "#504840",
          light: "#f5f1ec",
        },
        // Tertiary Crimson / Rose Heritage Pigment
        tertiary: {
          DEFAULT: "#8c3c3c",
          container: "#d47070",
          fixed: "#fce0e0",
          "fixed-dim": "#e8a0a0",
          dark: "#6e3030",
        },
        // Surface & Background Tones (Archival Museum Paper)
        surface: {
          DEFAULT: "#faf5ee",
          bright: "#faf5ee",
          dim: "#dcd6cc",
          variant: "#ece6dc",
          tint: "#c2652a",
          container: {
            lowest: "#ffffff",
            low: "#f6f0e8",
            DEFAULT: "#f2ece4",
            high: "#ece6dc",
            highest: "#e6e0d6",
          },
        },
        background: "#faf5ee",
        "on-surface": "#3a302a",
        "on-surface-variant": "#605850",
        "on-background": "#3a302a",
        "on-primary": "#ffffff",
        "on-secondary": "#ffffff",
        "on-tertiary": "#ffffff",
        "inverse-surface": "#3a302a",
        "inverse-on-surface": "#faf5ee",
        
        // Outlines & Borders
        outline: "#9a9088",
        "outline-variant": "#d8d0c8",
        border: "#e8e2d8",
        "border-subtle": "#f0ebe1",

        // Accent Colors
        gold: {
          DEFAULT: "#c8a75d",
          light: "#faf5eb",
          dark: "#9e803a",
        },
        vermilion: "#d62828",
        ink: "#111111",
        canvas: "#faf5ee",
        error: {
          DEFAULT: "#c0392b",
          container: "#fce4e0",
        },
      },
      fontFamily: {
        headline: ["'EB Garamond'", "Georgia", "serif"],
        display: ["'Playfair Display'", "'EB Garamond'", "Georgia", "serif"],
        body: ["'Manrope'", "'Plus Jakarta Sans'", "sans-serif"],
        sans: ["'Manrope'", "'Plus Jakarta Sans'", "sans-serif"],
        label: ["'Manrope'", "'Plus Jakarta Sans'", "sans-serif"],
        bengali: ["'Noto Serif Bengali'", "serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      boxShadow: {
        atelier: "0 20px 45px -15px rgba(24, 20, 15, 0.08), 0 0 1px 1px rgba(24, 20, 15, 0.04)",
        subtle: "0 4px 20px -2px rgba(24, 20, 15, 0.05)",
        float: "0 30px 60px -20px rgba(194, 101, 42, 0.12)",
        frame: "0 22px 48px -12px rgba(17, 17, 17, 0.22), 0 0 0 1px rgba(17, 17, 17, 0.08)",
        glass: "0 8px 32px 0 rgba(58, 48, 42, 0.08)",
        nav: "0 1px 8px rgba(58, 48, 42, 0.04)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}
