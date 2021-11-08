import { config } from './config.js';
import { perfObservers } from './observe-instances.js';
import { po, poDisconnect } from './performance-observer.js';
import { initResourceTiming } from './resource-timing.js';

export const initPerformanceObserver = () => {
  if (config.isResourceTiming) {
    po('resource', initResourceTiming);
  }
};
