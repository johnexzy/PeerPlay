import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './templates/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        "monumnet": ["var(--monumnet)"]
      },
      boxShadow: {
        smLight: "0px 0px 5px 0px #6546FC"
      },
      colors: {
        primary: {
          DEFAULT: "#05011A",
          500: "#504D5F"
        },
        secondary: {
          DEFAULT: "#6546FC"
        },
        gray: {
          DEFAULT: "rgba(217, 217, 217, 0.16)",
          100: "rgba(80, 77, 95, 0.15)",
          200: "rgba(135, 110, 254, 0.05)"
        }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
export default config
