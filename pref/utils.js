import { W, WP } from './constants.js';

export const isPerformanceSupported = () => {
  return WP && !!WP.getEntriesByType && !!WP.now && !!WP.mark;
};

export function trimTiming(time = 0) {
  return Math.round(time ? time : 0)
}

export const pushTask = (cb) => {
  if ('requestIdleCallback' in W) {
    W.requestIdleCallback(cb, { timeout: 3000 });
  } else {
    cb();
  }
};
