/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#14121F", velvet: "#7A1F43", gold: "#E8B04B", paper: "#F4EFF1" },
      fontFamily: { sans: ['"Bricolage Grotesque"', "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
