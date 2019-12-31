import { queryStringify } from './index';

// json数据转换URL参数
const parseParam = (param, key) => {
  let paramStr = '';
  if (['string', 'number', 'boolean'].indexOf(typeof param) !== -1) {
    // paramStr += "&" + key + "=" + encodeURIComponent(param);
    paramStr += `&${key}=${param}`;
  } else {
    /* eslint-disable no-restricted-syntax */
    /* eslint-disable no-prototype-builtins */
    for (const i in param) {
      if (param.hasOwnProperty(i)) {
        const element = param[i];
        const k =
          key == null ? i : key + (param instanceof Array ? `[${i}]` : `.${i}`);
        paramStr += `&${parseParam(element, k)}`;
      }
    }
  }
  return paramStr.substr(1);
};

export const request = async (url, { data, method, contentType, headers }) => {
  const domain =
    typeof window === 'undefined' ? process.env.domain : window.location.origin;

  if (typeof FormData === 'undefined' || !(data instanceof FormData)) {
    if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
      data = queryStringify(data);
    } else {
      data = data ? JSON.stringify(data) : null;
    }
  }

  if (contentType) {
    headers['content-type'] = contentType;
  }

  const res = await fetch(`${domain}${url}`, {
    headers,
    cache: 'no-cache',
    body: data,
    method,
    credentials: 'same-origin'
  });

  const resText = await res.text();

  try {
    return JSON.parse(resText);
  } catch (e) {
    console.error(
      `FetchUtil parse text to json failed, response text => ${resText}`
    );
    throw e;
  }
};

const post = (url, opts) => {
  const { data = {}, contentType = 'application/json', headers = {} } =
    opts || {};

  return request(url, {
    data,
    method: 'post',
    contentType,
    headers
  });
};

const postFormData = (url, opts) => {
  const { data = new FormData(), contentType = '', headers = {} } = opts || {};

  request(url, {
    data,
    method: 'post',
    contentType,
    headers
  });
};

const get = (url, opts) => {
  const { data: params = {}, contentType = 'application/json', headers = {} } =
    opts || {};
  if (url.indexOf('?') !== -1) {
    // eslint-disable-next-line no-param-reassign
    url += `&${parseParam(params)}`;
  } else if (Object.keys(params).length > 0) {
    // eslint-disable-next-line no-param-reassign
    url += `?${parseParam(params)}`;
  }
  return request(url, {
    data: null,
    method: 'get',
    contentType,
    headers
  });
};
export { post, get, postFormData };
