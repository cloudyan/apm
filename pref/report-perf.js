import { config } from './config.js';
import { pushTask } from './utils.js';

export const reportPerf = (measureName, data, customProperties = {}) => {
  pushTask(() => {
    if (!config.tracker) return;

    config.tracker({
      type: measureName,
      data,
      eventProperties: customProperties || {},
      // navigatorInformation: getNavigatorInfo(),
    })
  })
}
