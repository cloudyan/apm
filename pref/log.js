import { reportPerf } from './report-perf.js';
import { trimTiming } from './utils.js';

export const logData = (measureName, data, customProperties) => {
  // Object.keys(data).forEach(key => {
  //   if (typeof data[key] === 'number') {
  //     data[key] = trimTiming(data[key]);
  //   }
  // });

  // for (let key in data) {
  //   if (typeof data[key] === 'number') {
  //     data[key] = trimTiming(data[key]);
  //   }
  // }
  reportPerf(measureName, data, customProperties);
}
