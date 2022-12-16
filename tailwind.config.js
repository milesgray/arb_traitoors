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
        'royal-blue-100': '#e3f2fd',
        'royal-blue-200': '#bbdefb',
        'royal-blue-300': '#90caf9',
        'royal-blue-400': '#64b5f6',
        'royal-blue-500': '#3182ce',
        'royal-blue-600': '#2e7dc3',
        'royal-blue-700': '#2869a6',
        'royal-blue-800': '#1e5181',
        'royal-blue-900': '#153964',
        'new-green-100': '#e8f5e9',
        'new-green-200': '#c8e6c9',
        'new-green-300': '#a5d6a7',
        'new-green-400': '#81c784',
        'new-green-500': '#66bb6a',
        'new-green-600': '#4caf50',
        'new-green-700': '#43a047',
        'new-green-800': '#388e3c',
        'new-green-900': '#2e7d32',
        'regal-blue': '#243c5a',
        'ruby': '#e53e3e',
        'tangerine': '#dd6b20',
        'mustard': '#d69e2e',
        'forest-green': '#38a169',
        'teal-blue': '#319795',
        'royal-blue': '#3182ce',
        'blue-purple': '#6574cd',
        'light-purple': '#a0aec0',
        'hot-pink': '#f56565',
        'light-gray': '#a0aec0',
        'off-white': '#ffffff',
        'charcoal': '#2d3748',
      },
      fontFamily: {
        'gidugu': ['"Gidugu"', 'serif'],
        'intent': ['"Intent"', 'serif'],
        'graphik': ['"Graphik"', 'serif'],
        'arsenal': ['"Arsenal"', 'serif'],
        'merriweather': ['"Merriweather"', 'serif'],
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
    },
  },
  
};
