
import { config } from './config.js';
import { logData } from './log.js';
import { trimTiming } from './utils.js';
import { rt } from './metrics.js';

export const initResourceTiming = (performanceEntries = []) => {
  performanceEntries.forEach(entry => {
    if (config.isResourceTiming) {
      const data = {
        type: entry.entryType,
        // The numeric of the entry is `value` for Chrome 61, `duration` after that
        name: entry.name || entry.metric,
        duration: trimTiming(entry.duration || entry.value),

        entryType: entry.entryType,
        initiatorType: entry.initiatorType,
        protocol: entry.nextHopProtocol,
        decodedBodySize: entry.decodedBodySize,
        encodedBodySize: entry.encodedBodySize,
        transferSize: entry.transferSize,
        // 计算值
        // duration = entry.responseEnd - entry.startTime
        request: trimTiming(entry.responseEnd - entry.requestStart),
      };
      [
        'startTime',
        'redirectStart',
        'redirectEnd',
        'fetchStart',
        'domainLookupStart',
        'domainLookupEnd',
        'connectStart',
        'secureConnectionStart',
        'connectEnd',
        'requestStart',
        'responseStart',
        'responseEnd',
      ].forEach(key => {
        data[key] = trimTiming(entry[key])
      });

      if (entry.decodedBodySize && entry.initiatorType) {
        const bodySize = parseInt(entry.decodedBodySize / 1000);
        rt.value[entry.initiatorType] += bodySize;
        rt.value.total += bodySize;
      }

      logData('resourceTiming', data);
    }
  });
};

// let getResourceTiming = () => {}

// if ('performance' in window) {
//   function onBufferFull() {
//     var latestEntries = performance.getEntriesByType('resource');
//     performance.clearResourceTimings();

//     // analyze or beacon latestEntries, etc
//   }

//   performance.onresourcetimingbufferfull = performance.onwebkitresourcetimingbufferfull = onBufferFull;


//   getResourceTiming = (options = {}) => {
//     const entries = window.performance.getEntriesByType('resource');

//     if (options.debug) {
//       console.log(entries);
//     }

//     const resource = entries.map((item) => {
//       // let arr = resource[item.initiatorType];
//       // if (!arr) {
//       //   resource[item.initiatorType] = arr = [];
//       // }
//       return {
//         type: 'performance',
//         sub_type: 'performance_resource',

//         name: item.name,
//         entryType: item.entryType || '',
//         initiatorType: item.initiatorType || '',
//         duration: trimTiming(item?.duration),
//         transferSize: item.transferSize || '',        // 注意兼容性 https://caniuse.com/?search=transferSize
//         encodedBodySize: item.encodedBodySize || '',     // 资源解压后的大小
//         decodedBodySize: item.decodedBodySize || '',     // 资源解压后的大小
//         protocol: item.nextHopProtocol || '', // 请求协议 兼容性

//         // 时间保留到毫秒即可 ms
//         // 重定向的时间
//         redirect: trimTiming(item.redirectEnd - item.redirectStart),
//         // DNS 查询时间
//         lookupDomain: trimTiming(item.domainLookupEnd - item.domainLookupStart),
//         // 内容加载完成的时间
//         request: trimTiming(item.responseEnd - item.requestStart),
//         // TCP 建立连接完成握手的时间
//         connect: trimTiming(item.connectEnd - item.connectStart),
//       };
//     })

//     if (typeof options.report === 'function') {
//       options.report(resource);
//     }
//   }
// }

// export function getResourceTiming;
