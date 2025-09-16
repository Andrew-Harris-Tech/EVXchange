module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-leaflet|leaflet|@react-leaflet|@esri/leaflet-geocoder).+\\.js$'
  ],
  extensionsToTreatAsEsm: ['.js', '.jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFiles: [
    '<rootDir>/setupJest.js'
  ],
  testEnvironment: 'jsdom',
};
