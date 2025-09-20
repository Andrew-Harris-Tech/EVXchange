// Pure function for parsing EVXchange deep links (no Expo/React Native dependencies)
function parseEVXchangeDeepLink(url) {
  try {
    // Remove scheme if present
    const cleaned = url.replace(/^EVXchange:\/\//i, '');
    if (cleaned.startsWith('station/')) {
      const id = cleaned.split('/')[1];
      return `/station/${id}`;
    } else if (cleaned.startsWith('booking/')) {
      const id = cleaned.split('/')[1];
      return `/booking/${id}`;
    } else if (cleaned === 'profile') {
      return '/profile';
    }
    return null;
  } catch {
    return null;
  }
}

module.exports = { parseEVXchangeDeepLink };
