const FormData = require('form-data');
const fetch = require('isomorphic-fetch');
const qs = require('querystring');

const logger = require('./logUtil');
// const _request = require('superagent');

const request = async (url, data, method, contentType, headers = {}) => {
  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  if (!(data instanceof FormData)) {
    if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
      data = qs.stringify(data);
    } else {
      data = data ? JSON.stringify(data) : null;
    }
  } else {
    headers['Content-Type'] = `multipart/form-data; boundary=${data.getBoundary()}`;
  }

  const res = await fetch(`${url}`, {
    headers,
    cache: 'no-cache',
    body: data,
    method,
    credentials: 'include'
  });

  const resText = await res.text();

  return resText;
};

// const request = async (url, data, method, contentType) =>
//   _request[method](url)
//     .send(data)
//     .set('Content-Type', contentType)
//     .then(res => {
//       console.log('res.body', res.text);
//       return res.body;
//     });

const parseJSON = (resText) => {
  try {
    return JSON.parse(resText);
  } catch (e) {
    logger.error(`FetchUtil parse text to json failed, response text => ${resText}`);
    throw e;
  }
};

const post = async (url, data = {}, contentType = 'application/json', headers) => {
  const resText = await request(url, data, 'post', contentType, headers);

  return parseJSON(resText);
};

const get = async (url, params = {}, contentType = 'text/plain', headers) => {
  let combined = url;

  if (url.indexOf('?') !== -1) {
    combined += `&${qs.stringify(params)}`;
  } else if (Object.keys(params).length > 0) {
    combined += `?${qs.stringify(params)}`;
  }

  const resText = await request(combined, null, 'get', contentType, headers);

  return parseJSON(resText);
};

const getText = (url, params, contentType = 'text/plain', headers) => {
  let combined = url;
  if (url.indexOf('?') !== -1) {
    combined += `&${qs.stringify(params)}`;
  } else {
    combined += `?${qs.stringify(params)}`;
  }
  return request(combined, null, 'get', contentType, headers);
};

const postText = (url, data = {}, contentType = 'application/json', headers) =>
  request(url, data, 'post', contentType, headers);

module.exports = {
  post,
  get,
  postText,
  getText
};
