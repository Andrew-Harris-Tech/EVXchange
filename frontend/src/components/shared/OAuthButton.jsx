import React from 'react';

const providerConfig = {
  google: {
    label: 'Google',
    color: '#4285F4',
    icon: '/assets/icons/google.svg',
  },
  facebook: {
    label: 'Facebook',
    color: '#1877F3',
    icon: '/assets/icons/facebook.svg',
  },
  linkedin: {
    label: 'LinkedIn',
    color: '#0077B5',
    icon: '/assets/icons/linkedin.svg',
  },
};

export default function OAuthButton({ provider }) {
  const cfg = providerConfig[provider];
  if (!cfg) return null;

  const handleClick = () => {
    window.location.href = `/auth/login/${provider}`;
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: cfg.color,
        color: '#fff',
        border: 'none',
        borderRadius: 4,
        padding: '10px 20px',
        margin: '8px 0',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
      }}
      aria-label={`Login with ${cfg.label}`}
    >
      <img src={cfg.icon} alt="" style={{ width: 20, height: 20 }} />
      Login with {cfg.label}
    </button>
  );
}
