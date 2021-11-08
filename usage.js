import Apm from './pref/index.js';

export const ApmConfig = {
  resourceTiming: true,
  tracker,
};

export const perfume = new Apm(ApmConfig);

export function tracker(options) {
  const { type, data, eventProperties } = options;

  // if (type === 'dataConsumption') {
  //   window.navigator.sendBeacon('http://baidu.com', `${JSON.stringify(data)}`)
  // }
  console.log(type, JSON.stringify(data, null, 2), eventProperties);

}
