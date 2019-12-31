import { isClient } from './index';

const createJsBridge = () => {
  if (!isClient()) {
    return null;
  }
  const isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  let handler = null;

  if (isIos && window.webkit && window.webkit.messageHandlers) {
    // ios
    handler = window.webkit.messageHandlers;
  } else if (window.jsBridge) {
    // android
    handler = window.jsBridge;
  }

  return {
    invoke: (methodName, ...args) => {
      if (handler && handler[methodName]) {
        console.log('Invoke jsBride.', methodName, ' data passed =>', args);

        return isIos
          ? handler[methodName].postMessage(...args)
          : handler[methodName](...args);
      }
      throw new Error('Could not get invocation handler of this env.');
    }
  };
};

export default createJsBridge();
