/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            colors: {
                normal: "#F7F6DC",
                fighting: "#AAC4FF",
                flying: "#8D72E1",
                poison: "#8D72E1",
                ground: "#C7BCA1",
                rock: "#8B7E74",
                bug: "#829460",
                ghost: "#3F4E4F",
                steel: "D1D1D1",
                fire: "#D67D3E",
                water: "#89CFFD",
                grass: "#A8E890",
                electric: "#0096FF",
                psychic: "#FFEA11",
                ice: "#ABC9FF",
                dragon: "#EB4747",
                dark: "#5B7DB1",
                fairy: "#EBD671",
            },
        },
    },
    plugins: [],
};
