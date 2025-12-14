/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    fontFamily: {
      sans: [
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Ubuntu",
        "Cantarell",
        "Noto Sans",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
    },

    extend: {
      colors: {
        /* ===============================
           Material 3 – Light Theme
        =============================== */
          onPrimary: "#FFFFFF",
          primaryContainer: "#DCE1FF",
          onPrimaryContainer: "#344479",

          onSecondary: "#FFFFFF",
          secondaryContainer: "#DCE1FF",
          onSecondaryContainer: "#354479",

          onTertiary: "#FFFFFF",
          tertiaryContainer: "#FFD7F6",
          onTertiaryContainer: "#5B3D57",

          error: "#904A43",
          onError: "#FFFFFF",
          errorContainer: "#FFDAD6",
          onErrorContainer: "#73332D",

          background: "#FAF8FF",
          onBackground: "#1A1B21",

          surface: "#FAF8FF",
          onSurface: "#1A1B21",
          surfaceVariant: "#E2E1EC",
          onSurfaceVariant: "#45464F",

          outline: "#767680",
          outlineVariant: "#C6C6D0",

        /* ===============================
           Material Color Palettes
        =============================== */
        primary: {
          DEFAULT: "#1E40AF",
          10: "#00164E",
          20: "#00287D",
          30: "#003BAF",
          40: "#004FE4",
          50: "#346BFF",
          60: "#668AFF",
          70: "#8FA7FF",
          80: "#B6C4FF",
          90: "#DCE1FF",
          95: "#EFF0FF",
          99: "#FEFBFF",
        },

        secondary: {
          DEFAULT: "#4D5C92",
          10: "#00164F",
          20: "#00277E",
          30: "#013BB0",
          40: "#2D55C9",
          50: "#4B6FE3",
          60: "#678AFF",
          70: "#8FA7FF",
          80: "#B6C4FF",
          90: "#DCE1FF",
        },

        tertiary: {
          DEFAULT: "#755470",
          10: "#350634",
          20: "#4D1D4B",
          30: "#673463",
          40: "#814C7C",
          50: "#9C6496",
          60: "#B97DB1",
          70: "#D597CD",
          80: "#F3B2E9",
          90: "#FFD7F6",
        },

        neutral: {
          10: "#1C1B1B",
          20: "#313030",
          30: "#484646",
          40: "#605E5E",
          50: "#797676",
          60: "#939090",
          70: "#ADAAAA",
          80: "#C9C6C5",
          90: "#E5E2E1",
          95: "#F4F0EF",
          99: "#FEFBFF",
        },
      },

      /* ===============================
         Material Elevation
      =============================== */
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.08)",
        cardHover: "0 4px 12px rgba(0,0,0,.15)",
      },

      borderRadius: {
        xl: "16px",
      },
    },
  },

  plugins: [],
};
