module.exports = {
  content: [],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "chat-pattern": "url('assets/images/background.png')",
      },
      maxWidth: {
        44: "176px",
      },
      spacing: {
        "73px": "73px",
      },
      animation: {
        pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: ".2",
            transform: "scale(0.5)",
          },
        },
      },
    },
  },
  plugins: [],
};
