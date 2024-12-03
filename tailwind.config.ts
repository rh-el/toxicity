import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	fontFamily: {
		'quicksand': ['Quicksand'],
		'inter': ['Inter']
	},
  	extend: {
  		colors: {
			'primary': '#2D316F'
  		},
  	}
  },
} satisfies Config;
