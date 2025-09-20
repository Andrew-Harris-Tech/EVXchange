
import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';


export function parseEVXchangeDeepLink(url: string): string | null {
  // Returns the route path or null if not recognized
  try {
    const { path } = Linking.parse(url);
    if (!path) return null;
    if (path.startsWith('station/')) {
      const id = path.split('/')[1];
      return `/station/${id}`;
    } else if (path.startsWith('booking/')) {
      const id = path.split('/')[1];
      return `/booking/${id}`;
    } else if (path === 'profile') {
      return '/profile';
    }
    return null;
  } catch {
    return null;
  }
}

// Allow injection of a custom router for testing
export function useDeepLinking(customRouter?: { push: (path: string) => void }) {
  const router = customRouter || useRouter();

  useEffect(() => {
    const handleDeepLink = (event: Linking.EventType) => {
      const route = parseEVXchangeDeepLink(event.url);
      if (route) router.push(route);
    };
    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription.remove();
  }, [router]);
}
