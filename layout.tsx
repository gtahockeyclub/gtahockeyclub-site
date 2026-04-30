import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ice: "#EAF7FF",
        navy: "#071627",
        rink: "#0B2742",
        redline: "#D62828"
      }
    }
  },
  plugins: []
};
export default config;
