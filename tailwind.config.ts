import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        tommy: {
          dark: "rgb(25, 14, 11)",
          orange: "rgb(232, 73, 33)",
          "orange-hover": "rgb(200, 60, 25)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
