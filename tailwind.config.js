/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#fff1e5",
          dark: "#f6e4d2",
          deep: "#ecd7bf",
          light: "#fffaf3",
        },
        ink: {
          black: "#1a1716",
          pink: "#990f3d",
          blue: "#1b3a5b",
          yellow: "#f6e4d2",
          teal: "#3c5a3e",
          slate: "#66605c",
          rule: "#e6d5c3",
        },
      },
      fontFamily: {
        zine: ["'Playfair Display'", "Georgia", "serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
        body: ["'Source Serif 4'", "'Source Serif Pro'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        riso: "0 1px 0 0 #e6d5c3",
        "riso-lg": "0 1px 0 0 #e6d5c3",
        "riso-pink": "0 1px 0 0 #990f3d",
        "riso-blue": "0 1px 0 0 #1b3a5b",
        "riso-inset": "none",
      },
      borderWidth: {
        3: "1px",
      },
    },
  },
  plugins: [],
};
