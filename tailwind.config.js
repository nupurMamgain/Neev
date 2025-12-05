// tailwind.config.js (ES Modules Format)

/** @type {import('tailwindcss').Config} */
export default {
  // सुनिश्चित करें कि यह आपके source files (components) को स्कैन करे
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      // 1. Keyframes define करें (Background Image स्क्रॉल करने के लिए)
      keyframes: {
        'bg-slide': {
          // 0% पर पहली इमेज दिखती है
          '0%': { 
            'background-position': '0% 0%', 
          },
          // 33% पर दूसरी इमेज दिखने लगती है
          '33%': { 
            'background-position': '50% 0%', 
          },
          // 66% पर तीसरी इमेज दिखने लगती है
          '66%': {
            'background-position': '100% 0%', 
          },
          // 100% पर यह वापस पहली पोजीशन पर चला जाता है
          '100%': {
            'background-position': '0% 0%', 
          },
        },
      },
      // 2. Animation utility class define करें
      animation: {
        // 'animate-bg-slide' Tailwind क्लास उपलब्ध होगी
        'bg-slide': 'bg-slide 15s infinite alternate',
      },
    },
  },
  plugins: [],
};