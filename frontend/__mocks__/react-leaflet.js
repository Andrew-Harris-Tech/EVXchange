// __mocks__/react-leaflet.js
const React = require('react');

module.exports = {
  MapContainer: ({ children }) => React.createElement('div', {}, children),
  TileLayer: () => React.createElement('div'),
  Marker: () => React.createElement('div'),
  Popup: ({ children }) => React.createElement('div', {}, children),
  useMap: () => ({ setView: () => {} }),
  useMapEvent: () => {},
  useMapEvents: () => {},
};
