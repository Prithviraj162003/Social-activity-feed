module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        accent: '#10b981',
        muted: '#6b7280'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(2,6,23,0.08)'
      }
    }
  },
  plugins: []
};
