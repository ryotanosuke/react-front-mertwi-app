// mantineと衝突するためベースラインを無効化
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0.1',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
    },
    animation: {
      'fade-in-down': 'fade-in-down 0.3s ease-in',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
