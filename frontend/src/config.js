// Centralized API configuration for local and deployed production environments
const rawApiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').trim();

// Robust function to strip all trailing slashes from the base URL
const cleanBaseUrl = (url) => {
  let cleaned = url;
  while (cleaned.endsWith('/')) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned;
};

export const API_URL = cleanBaseUrl(rawApiUrl);
