/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				lato: ["Lato", "sans-serif"],
			},
			colors: {
				'white-custom': "#ffffff",
				'gray-custom': "#6f6f6f",
				'green-custom': "#00733f",
				'red-custom': "#b00c28",
				'black-custom': "#231f20",
			},
		},
	},
	plugins: [],
};
