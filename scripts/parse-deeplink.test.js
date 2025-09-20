const { parseEVXchangeDeepLink } = require('./parse-deeplink');

describe('parseEVXchangeDeepLink', () => {
  it('parses station deep link', () => {
    expect(parseEVXchangeDeepLink('EVXchange://station/123')).toBe('/station/123');
  });
  it('parses booking deep link', () => {
    expect(parseEVXchangeDeepLink('EVXchange://booking/456')).toBe('/booking/456');
  });
  it('parses profile deep link', () => {
    expect(parseEVXchangeDeepLink('EVXchange://profile')).toBe('/profile');
  });
  it('returns null for unknown deep link', () => {
    expect(parseEVXchangeDeepLink('EVXchange://foo')).toBeNull();
  });
  it('returns null for malformed url', () => {
    expect(parseEVXchangeDeepLink('not-a-url')).toBeNull();
  });
});
