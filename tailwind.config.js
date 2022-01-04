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
        "4/5": "80%",
      },
      spacing: {
        "73px": "73px",
        "3%": "3%",
        "5%": "5%",
      },
      height: {
        "60vh": "60vh",
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
