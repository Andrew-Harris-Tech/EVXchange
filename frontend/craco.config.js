module.exports = {
  jest: {
    configure: {
      transformIgnorePatterns: [
        '/node_modules/(?!react-leaflet|leaflet|@react-leaflet|@esri/leaflet-geocoder).+\\.js$'
      ],
      moduleNameMapper: {
        '^react-leaflet$': '<rootDir>/__mocks__/react-leaflet.js',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
      setupFiles: [
        '<rootDir>/setupJest.js'
      ],
      testEnvironment: 'jsdom',
    }
  }
};
