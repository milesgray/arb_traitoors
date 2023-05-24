import { PRODUCTION_PREVIEW_KEY } from "./localStorage";

export const UI_VERSION = "1.0";

export function isDevelopment() {
  if (typeof localStorage === 'undefined') {
    return false;
  }
  if (typeof window === 'undefined') {
    return false;
  }
  const isProductionPreview = Boolean(localStorage.getItem(PRODUCTION_PREVIEW_KEY));

  return (
    !window.location.host?.includes("fleek.co") && !window.location.host?.includes("ipfs.io") && !isProductionPreview
  );
}

export function isLocal() {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.location.host?.includes("localhost");
}
