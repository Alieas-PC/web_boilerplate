import raf from 'raf';
/* eslint-disable no-restricted-globals */
/* eslint-disable no-multi-assign */
import { Decimal } from 'decimal.js';

/**
 * 根据传入的cookie获取指定cookie的值
 * @param {*} key
 * @param {*} cookie
 */
const getCookie = (key, cookie) => {
  if (!cookie && typeof window === 'undefined') {
    return '';
  }
  const matched = (cookie || window.document.cookie).match(
    new RegExp(`(?:^|;)\\s?${key}=(.*?)(?:;|$)`)
  );

  return matched ? matched[1] || '' : '';
};

/**
 * 设置cookie
 * @param {*} key
 * @param {*} value
 * @param {*} cookie
 */
const setCookie = (key, value, maxAge, cookie) => {
  if (typeof window === 'undefined') {
    /* eslint-disable no-param-reassign */
    cookie.set(key, value, {
      maxAge
    });
  } else {
    window.document.cookie = `${key}=${value}; expires=${new Date(
      new Date().valueOf() + maxAge
    ).toGMTString()}`;
  }
};

/**
 * 创建js精确计数字计算器
 * @param {*} precision
 * @param {*} rounding
 */
const createCalculator = (precision, rounding) => {
  const D = Decimal.clone({ defaults: true, precision, rounding });

  /*
    ROUND_UP          0      Rounds away from zero
    ROUND_DOWN        1      Rounds towards zero
    ROUND_CEIL        2      Rounds towards Infinity
    ROUND_FLOOR       3      Rounds towards -Infinity
    ROUND_HALF_UP     4      Rounds towards nearest neighbour.
                             If equidistant, rounds away from zero
    ROUND_HALF_DOWN   5      Rounds towards nearest neighbour.
                             If equidistant, rounds towards zero
    ROUND_HALF_EVEN   6      Rounds towards nearest neighbour.
                             If equidistant, rounds towards even neighbour
    ROUND_HALF_CEIL   7      Rounds towards nearest neighbour.
                             If equidistant, rounds towards Infinity
    ROUND_HALF_FLOOR  8      Rounds towards nearest neighbour.
                             If equidistant, rounds towards -Infinity
  */

  return {
    sum: (num1, num2) => new D(num1).plus(new D(num2)).toNumber(),
    minus: (num1, num2) => new D(num1).minus(new D(num2)).toNumber(),
    divide: (num1, num2) => new D(num1).dividedBy(new D(num2)).toNumber(),
    multiply: (num1, num2) => new D(num1).times(new D(num2)).toNumber(),
    D,
    toDP: (num, dp = precision, rm = rounding) =>
      new D(num).toDecimalPlaces(dp, rm).toNumber()
  };
};

/**
 * 是否数字
 * @param {*} n
 */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * 平滑滚动
 * @param {*} scrollFn
 * @param {*} nowAt
 * @param {*} target
 * @param {*} speed
 * @param {*} isForward
 */
function smoothlyScroll(scrollFn, nowAt, target, speed, isForward) {
  raf(() => {
    const isNotEnded = isForward ? nowAt < target : nowAt > target;

    const totalDistance = Math.abs(nowAt - target);

    // 是否最后一步
    if (isForward) {
      if (totalDistance < speed) {
        speed = totalDistance;
      }
    } else if (totalDistance < Math.abs(speed)) {
      speed = -totalDistance;
    }

    if (isNotEnded) {
      scrollFn(nowAt + speed, false);

      smoothlyScroll(scrollFn, nowAt + speed, target, speed, isForward);
    }
  });
}

/**
 * 获取或设置scrollTop
 * @param {*} top
 */
function scrollTop(top, smoothly, inMillisecs = 100) {
  const scrollTopVal =
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop;

  if (isNumeric(top)) {
    if (smoothly) {
      const fps = inMillisecs / 16;

      const distance = Math.abs(scrollTopVal - top);

      const speed = distance / fps;

      smoothlyScroll(
        scrollTop,
        scrollTopVal,
        top,
        top > scrollTopVal ? speed : -speed,
        top > scrollTopVal
      );
    }

    document.documentElement.scrollTop = window.pkageYOffset = document.body.scrollTop = top;
  }

  return top || scrollTopVal;
}

/**
 * 获取或设置scrollLeft
 * @param {*} top
 */
function scrollLeft(left, smoothly, inMillisecs = 100) {
  const scrollLeftVal =
    document.documentElement.scrollLeft ||
    window.pageXOffset ||
    document.body.scrollLeft;

  if (isNumeric(left)) {
    if (smoothly) {
      const fps = inMillisecs / 16;

      const distance = Math.abs(scrollLeftVal - left);

      const speed = distance / fps;

      smoothlyScroll(
        scrollLeft,
        scrollLeftVal,
        left,
        left > scrollLeftVal ? speed : -speed,
        left > scrollLeftVal
      );
    }

    document.documentElement.scrollLeft = window.pageXOffset = document.body.scrollLeft = left;
  }

  return left || scrollLeftVal;
}

/**
 * 加载script文件
 * @param {*} src
 */
const loadThirdPartyScript = src =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.onload = resolve;

    script.onerror = reject;

    script.src = src;

    document.head.appendChild(script);
  });

/**
 * 拼接参数为查询字符串
 * @param {*} obj
 * @param {*} isSearchStr
 */
const queryStringify = (obj = {}, isSearchStr) => {
  const entries = Object.entries(obj);

  const querystring = entries
    .map(([key, value]) => `${key}=${value || ''}`)
    .join('&');

  return entries.length && isSearchStr ? `?${querystring}` : querystring;
};

/**
 * 解析查询字符串为object
 * @param {*} str
 */
const parseQueryStr = (str = '') => {
  let s = str;
  if (str.indexOf('?') === 0) {
    s = str.substr(1);
  }

  return s.split('&').reduce((prev, e) => {
    const temp = prev;

    const [key, value] = e.split('=');

    temp[key] = value;

    return temp;
  }, {});
};

const isClient = () => typeof window !== 'undefined';

const sleep = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

const maskPhoneNo = account =>
  account ? `${account.substr(0, 3)}****${account.substr(7, 4)}` : '';

const formatCurrency = (num, dp) => {
  const formatter = new Intl.NumberFormat('en-US');

  if (typeof num !== 'number' && typeof num !== 'string') {
    return num;
  }

  const { toDP } = createCalculator(dp, 4);

  return formatter.format(toDP(num, dp));
};

export default {
  getCookie,
  setCookie,
  queryStringify,
  parseQueryStr,
  loadThirdPartyScript,
  createCalculator,
  isNumeric,
  scrollTop,
  scrollLeft,
  isClient,
  sleep,
  maskPhoneNo,
  formatCurrency
};
