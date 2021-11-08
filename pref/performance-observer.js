import { C } from './constants.js';
import { perfObservers } from './observe-instances.js';

export const po = (eventType, cb) => {
  try {
    const perfObserver = new PerformanceObserver(entryList => {
      cb(entryList.getEntries());
    });
    // Retrieve buffered events and subscribe to newer events for Paint Timing
    perfObserver.observe({ type: eventType, buffered: true });
    return perfObserver;
  } catch (e) {
    C.warn('Apm.js:', e);
  }
  return null;
};

export const poDisconnect = (observer) => {
  if (perfObservers[observer]) {
    perfObservers[observer].disconnect();
  }
  delete perfObservers[observer];
}
