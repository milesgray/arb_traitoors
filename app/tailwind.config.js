const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("@headlessui/tailwindcss"),
    require('@tailwindcss/forms')
  ],
  theme: {
    
    extend: {
      colors: {
        "aurora-100": "#FFF8E1",
        "aurora-200": "#FFECB3",
        "aurora-300": "#FFE082",
        "aurora-400": "#FFD54F",
        "aurora-500": "#FFCA28",
        "aurora-600": "#F5A623",
        "aurora-700": "#F59E0F",
        "aurora-800": "#F58605",
        "aurora-900": "#F56B00",

        "crimson-tide-50": "#FFEBEB",
        "crimson-tide-100": "#FFCDCD",
        "crimson-tide-200": "#FFA8A8",
        "crimson-tide-300": "#FF8787",
        "crimson-tide-400": "#FF6A6A",
        "crimson-tide-500": "#DC143C",
        "crimson-tide-600": "#CB252B",
        "crimson-tide-700": "#B93731",
        "crimson-tide-800": "#A74A36",

        "ruby-100": "#ffcdd2",
        "ruby-200": "#ef9a9a",
        "ruby-300": "#e57373",
        "ruby-400": "#ef5350",
        "ruby-500": "#e53935",
        "ruby-600": "#d32f2f",
        "ruby-700": "#c62828",
        "ruby-800": "#b71c1c",
        "ruby-900": "#ff1744",

        "ruby-sat10-50": "#ffedee",
        "ruby-sat10-100": "#ffd3d6",
        "ruby-sat10-200": "#f1a1a4",
        "ruby-sat10-300": "#e68888",
        "ruby-sat10-400": "#f05b6c",
        "ruby-sat10-500": "#e54c5f",
        "ruby-sat10-600": "#d64058",
        "ruby-sat10-700": "#c93552",
        "ruby-sat10-800": "#bc2b4d",
        "ruby-sat10-900": "#e10000",
        "ruby-sat10-950": "#f63a3f",

        "glow-ruby-magma-100": "#ffd6d6",
        "glow-ruby-magma-200": "#ffb3b3",
        "glow-ruby-magma-300": "#ff8f8f",
        "glow-ruby-magma-400": "#ff6b6b",
        "glow-ruby-magma-500": "#ff5e5e",
        "glow-ruby-magma-600": "#f55b5b",
        "glow-ruby-magma-700": "#e65656",
        "glow-ruby-magma-800": "#d65151",
        "glow-ruby-magma-900": "#c74b4b",
        
        "ruby-magma-100": "#ffb3b3",
        "ruby-magma-200": "#ff8080",
        "ruby-magma-300": "#ff4d4d",
        "ruby-magma-400": "#ff1a1a",
        "ruby-magma-500": "#ff0d0d",
        "ruby-magma-600": "#f40404",
        "ruby-magma-700": "#e50303",
        "ruby-magma-800": "#d60202",
        "ruby-magma-900": "#c70100",

        "jungle-green-50": "#EBF5EB",
        "jungle-green-100": "#D3E9D3",
        "jungle-green-200": "#B9DDB9",
        "jungle-green-300": "#A0D1A0",
        "jungle-green-400": "#86C586",
        "jungle-green-500": "#006400",
        "jungle-green-600": "#005200",
        "jungle-green-700": "#004600",
        "jungle-green-800": "#003B00",

        "midnight-blue-50": "#EBF5FF",
        "midnight-blue-100": "#D3E9FF",
        "midnight-blue-200": "#B9DDFE",
        "midnight-blue-300": "#A0D1FE",
        "midnight-blue-400": "#86C5FE",
        "midnight-blue-500": "#191970",
        "midnight-blue-600": "#151760",
        "midnight-blue-700": "#101451",
        "midnight-blue-800": "#0C123A",

        "sunset-orange-50": "#FFF1F1",
        "sunset-orange-100": "#FFD9D9",
        "sunset-orange-200": "#FFBFBF",
        "sunset-orange-300": "#FFA8A8",
        "sunset-orange-400": "#FF9292",
        "sunset-orange-500": "#FFA07A",
        "sunset-orange-600": "#FF946D",
        "sunset-orange-700": "#FF865F",
        "sunset-orange-800": "#FF7852"
      },
      fontFamily: {
        'intent': ['"Intent"', 'cursive'],
        'goldman': ['"Goldman"', 'cursive'],
        'graphik': ['"Graphik"', 'cursive'],
        'merriweather': ['"Merriweather"', 'cursive'],
        'squada-one': ['"Squada One"', 'cursive'],
        'oxanium': ['"Oxanium"', 'cursive'],
      },
      minHeight: {
        "screen-75": "75vh",
      },
      fontSize: {
        55: "55rem",
      },
      opacity: {
        80: ".8",
      },
      zIndex: {
        2: 2,
        3: 3,
      },
      marginTop: {
        29: "7.8rem",
      },
      inset: {
        "-100": "-100%",
        "-225-px": "-225px",
        "-160-px": "-160px",
        "-150-px": "-150px",
        "-94-px": "-94px",
        "-50-px": "-50px",
        "-29-px": "-29px",
        "-20-px": "-20px",
        "25-px": "25px",
        "40-px": "40px",
        "95-px": "95px",
        "145-px": "145px",
        "195-px": "195px",
        "210-px": "210px",
        "260-px": "260px",
      },
      height: {
        "95-px": "95px",
        "70-px": "70px",
        "350-px": "350px",
        "500-px": "500px",
        "600-px": "600px",
      },
      maxHeight: {
        "860-px": "860px",
      },
      maxWidth: {
        "100-px": "100px",
        "120-px": "120px",
        "150-px": "150px",
        "180-px": "180px",
        "200-px": "200px",
        "210-px": "210px",
        "580-px": "580px",
      },
      minWidth: {
        "140-px": "140px",
        48: "12rem",
      },
      backgroundSize: {
        full: "100%",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      }
    },
  },
  
};
