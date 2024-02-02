import tailwindCssForm from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  // @tailwindcss/forms - reset form styles making form elements easy to override
  plugins: [tailwindCssForm],
}
