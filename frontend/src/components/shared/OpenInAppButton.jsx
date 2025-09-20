import React from 'react';

const MOBILE_SCHEME = 'EVXchange';
const IOS_APP_STORE_URL = process.env.IOS_APP_STORE_URL || 'https://apps.apple.com/app/EVXchange/id123456789';
const ANDROID_PLAY_STORE_URL = process.env.ANDROID_PLAY_STORE_URL || 'https://play.google.com/store/apps/details?id=com.EVXchange';

export function openMobileApp(deepLink, fallbackUrl) {
  // Try to open the app, fallback to store if not installed
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const appUrl = `${MOBILE_SCHEME}://${deepLink}`;
  const storeUrl = isIOS ? IOS_APP_STORE_URL : ANDROID_PLAY_STORE_URL;
  const timeout = setTimeout(() => {
    window.location.href = fallbackUrl || storeUrl;
  }, 1500);
  window.location.href = appUrl;
  // Clear timeout if app opens
  window.addEventListener('blur', () => clearTimeout(timeout), { once: true });
}

export function OpenInAppButton({ deepLink, fallbackUrl, children }) {
  return (
    <button
      onClick={() => openMobileApp(deepLink, fallbackUrl)}
      style={{ margin: '12px 0', padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 4 }}
    >
      {children || 'Open in App'}
    </button>
  );
}
