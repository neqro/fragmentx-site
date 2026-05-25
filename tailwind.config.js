/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#080818",
        card: "#0f1628",
        border: "#1e2a45",
        accent: "#6366f1",
      },
      fontFamily: {
        mono: ["'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
