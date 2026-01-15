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
        "Roboto",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
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
           Material 3 – Semantic Colors
        =============================== */
        primary: {
          DEFAULT: "#1E40AF",
          container: "#DCE1FF",
          on: "#FFFFFF",
          "on-container": "#344479",
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
          container: "#DCE1FF",
          on: "#FFFFFF",
          "on-container": "#354479",
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
          container: "#FFD7F6",
          on: "#FFFFFF",
          "on-container": "#5B3D57",
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

        error: {
          DEFAULT: "#BA1A1A",
          container: "#FFDAD6",
          on: "#FFFFFF",
          "on-container": "#410002",
        },

        surface: {
          DEFAULT: "#FAF8FF",
          dim: "#DBD9E0",
          bright: "#FAF8FF",
          variant: "#E2E1EC",
          container: {
            DEFAULT: "#F3EDF7",
            low: "#F7F2FA",
            high: "#ECE6F0",
            highest: "#E6E0E9",
          },
          on: "#1A1B21",
          "on-variant": "#45464F",
        },

        outline: {
          DEFAULT: "#767680",
          variant: "#C6C6D0",
        },

        background: "#FAF8FF",
        "on-background": "#1A1B21",

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
         Material 3 Elevation System
      =============================== */
      boxShadow: {
        "elevation-0": "none",
        "elevation-1": "0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)",
        "elevation-2": "0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)",
        "elevation-3": "0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)",
        "elevation-4": "0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.3)",
        "elevation-5": "0 8px 12px 6px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.3)",
      },

      /* ===============================
         Material 3 Border Radius
      =============================== */
      borderRadius: {
        "none": "0px",
        "xs": "4px",
        "sm": "8px",
        "md": "12px",
        "lg": "16px",
        "xl": "20px",
        "2xl": "28px",
        "full": "9999px",
      },

      /* ===============================
         Material 3 Typography Scale
      =============================== */
      fontSize: {
        "display-large": ["57px", { lineHeight: "64px", fontWeight: "400" }],
        "display-medium": ["45px", { lineHeight: "52px", fontWeight: "400" }],
        "display-small": ["36px", { lineHeight: "44px", fontWeight: "400" }],
        "headline-large": ["32px", { lineHeight: "40px", fontWeight: "400" }],
        "headline-medium": ["28px", { lineHeight: "36px", fontWeight: "400" }],
        "headline-small": ["24px", { lineHeight: "32px", fontWeight: "400" }],
        "title-large": ["22px", { lineHeight: "28px", fontWeight: "400" }],
        "title-medium": ["16px", { lineHeight: "24px", fontWeight: "500" }],
        "title-small": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        "label-large": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        "label-medium": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        "label-small": ["11px", { lineHeight: "16px", fontWeight: "500" }],
        "body-large": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-medium": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-small": ["12px", { lineHeight: "16px", fontWeight: "400" }],
      },

      /* ===============================
         Animation & Transitions
      =============================== */
      transitionDuration: {
        "short-1": "50ms",
        "short-2": "100ms",
        "short-3": "150ms",
        "short-4": "200ms",
        "medium-1": "250ms",
        "medium-2": "300ms",
        "medium-3": "350ms",
        "medium-4": "400ms",
        "long-1": "450ms",
        "long-2": "500ms",
        "long-3": "550ms",
        "long-4": "600ms",
      },
    },
  },

  plugins: [],
};
