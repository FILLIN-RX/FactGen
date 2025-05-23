import { display } from "html2canvas/dist/types/css/property-descriptors/display"
import { fontFamily } from "html2canvas/dist/types/css/property-descriptors/font-family"

// tailwind.config.js
export default {
    darkMode: ['class', '[data-theme="dark"]'], // supporte `class="dark"` ou `[data-theme="dark"]`
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}", // ou adapte selon ton projet
    ],
    theme: {
      extend: {
        colors: {
          primary: "#463581",
          backgroundDark: "#141122",
        },
        fontFamily:{
            display: ['Inter', 'sans-serif'],
        }
      },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ['light', 'dark'],
      mydark: {
       
        "primary": "#463581",
        "base-100": "#141122",
        "background": "#141122",
        // autres couleurs
      }, // ou une liste de thèmes comme ["light", "dark"]
     
    },
    
  }
  