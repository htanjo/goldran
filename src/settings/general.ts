import { WebXRSessionManager } from '@babylonjs/core/XR/webXRSessionManager';
import Bowser from 'bowser';

export const frameHeight = 200;
export const hasPointingDevice = matchMedia('(pointer:fine)').matches; // TODO: May not be perfect.
export const hasTouchscreen = matchMedia('(pointer:coarse)').matches;
export function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}
const browser = Bowser.parse(window.navigator.userAgent);
const graphicsQueryParam = new URLSearchParams(window.location.search).get(
  'graphics',
);
// If URL has "?graphics=quality" or "?graphics=performance", set quality mode accordingly.
// Otherwise, quality mode is available only on PC.
let qualityModeCheck: boolean;
switch (graphicsQueryParam) {
  case 'quality':
    qualityModeCheck = true;
    break;
  case 'performance':
    qualityModeCheck = false;
    break;
  default:
    qualityModeCheck = browser.platform.type === 'desktop';
}
export const qualityMode = qualityModeCheck;
export const isDesktop = browser.platform.type === 'desktop';
export const vrMode =
  new URLSearchParams(window.location.search).get('vr') === 'true';
export const checkVrSupport = async () => {
  const supported =
    await WebXRSessionManager.IsSessionSupportedAsync('immersive-vr');
  return supported;
};
export const touchMultiplier = 2.5;
export const scrollMultiplier = hasTouchscreen ? touchMultiplier : 1;
export const siteUrl = 'https://htanjo.github.io/goldran/';
