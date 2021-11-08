// import getResourceTiming from './resource-timing.js';

// const reportLog(data) {

// }

// getResourceTiming({
//   debug: false,
//   report: reportLog,
// })

import { D, W, WN, WP } from './constants.js';
import { config } from './config.js';
import { isPerformanceSupported } from './utils.js';
import { initPerformanceObserver } from './observe.js';
import { rt } from './metrics.js';
import { logData } from './log.js';

D.addEventListener('visibilitychange', function() {
  if (D.visiblityState === 'hidden') {
    // var sessionData = buildSessionReport();
    // navigator.sendBeacon(`${reportUrl}/log`, sessionData);
    console.log('hidden')
    logData('dataConsumption', rt.value);
  }
});

export default class Apm {
  v = '0.0.1';

  constructor(options = {}) {
    config.tracker = options.tracker;
    config.isResourceTiming = !!options.resourceTiming;

    if (!isPerformanceSupported()) return;

    if ('PerformanceObserver' in W) {
      initPerformanceObserver();
    }

    // window.addEventListener('unload', () => {
    //   logData('dataConsumption', rt.value);
    // }, false);


  }

  // 手动添加日志
  report(data) {

  }

  // 主动上报
  send() {

  }
}
