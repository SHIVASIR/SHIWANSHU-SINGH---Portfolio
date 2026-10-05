/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Google Analytics 4 (GA4) / Plausible Analytics helper for SPA route & interaction tracking

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-PORTFOLIO2026';

/**
 * Initialize Google Analytics 4 dynamically and asynchronously
 * Ensures zero impact on main thread critical rendering path
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // Check if script already exists
  if (document.getElementById('ga-gtag-script')) return;

  // Create async script tag for Google Analytics gtag.js
  const script = document.createElement('script');
  script.id = 'ga-gtag-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname + window.location.hash,
    send_page_view: true,
  });

  console.log(`[Analytics] GA4 Initialized with ID: ${GA_MEASUREMENT_ID}`);
}

/**
 * Track custom user interactions (e.g., project clicks, resume downloads, contact forms)
 */
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Track SPA section navigation/pageviews when user scrolls or changes hash
 */
export function trackPageView(pagePath: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
    });
  }
}
