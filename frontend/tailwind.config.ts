const withMT = require("@material-tailwind/react/utils/withMT");
import type { Config } from "tailwindcss";

const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#fed385",
        borderPrimary: "#34353c",
      },
    },
  },
  plugins: [],
});
export default config;
