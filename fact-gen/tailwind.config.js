// tailwind.config.js
export default {
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
      },
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: false,
      mydark: {
        "primary": "#463581",
        "base-100": "#141122",
        "background": "#141122",
        // autres couleurs
      }, // ou une liste de thèmes comme ["light", "dark"]
    },
  }
  