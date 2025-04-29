/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#007AFF",
                secondary: "#5856D6",
                background: "#FFFFFF",
                foreground: "#000000",
                card: "#F2F2F7",
                border: "#C7C7CC",
                notification: "#FF3B30",
                muted: "#8E8E93",
                accent: "#34C759",
                destructive: "#FF3B30",
            },
            fontFamily: {
                sans: ["System"],
            },
        },
    },
    plugins: [],
} 