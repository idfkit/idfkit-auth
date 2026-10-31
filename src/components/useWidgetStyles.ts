import { useSyncExternalStore } from 'react';
import type { StyleConfig } from '@stytch/vanilla-js';
import dark from '../identity/stytch/styles.json';
import light from '../identity/stytch/styles.light.json';

const DARK_SCHEME = '(prefers-color-scheme: dark)';

/**
 * Dark when the page's data-theme says so, or when the system prefers dark and data-theme does
 * not say light: the guard the vendored tokens.css applies, so the widget follows the page.
 */
const isDark = (): boolean => {
  const theme = document.documentElement.dataset.theme;
  if (theme === 'light') return false;
  if (theme === 'dark') return true;
  return window.matchMedia(DARK_SCHEME).matches;
};

const subscribe = (onChange: () => void): (() => void) => {
  const query = window.matchMedia(DARK_SCHEME);
  query.addEventListener('change', onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => {
    query.removeEventListener('change', onChange);
    observer.disconnect();
  };
};

/**
 * The hosted widget's styles from the vendored stytch derivation: styles.json for the dark
 * theme, styles.light.json for the light one, passed unchanged (contracts/derivations.md).
 */
export const useWidgetStyles = (): StyleConfig => (useSyncExternalStore(subscribe, isDark) ? dark : light);
