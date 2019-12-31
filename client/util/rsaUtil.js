const pubKey = process.env.RSA_PUB_KEY;

let instance = null;

function encrypt(data) {
  if (instance) {
    return instance.encrypt(data);
  }
  return null;
}

function decrypt(data) {
  if (instance) {
    return instance.decrypt(data);
  }
  return null;
}

if (typeof window !== 'undefined') {
  /* eslint-disable global-require */
  const { JSEncrypt } = require('jsencrypt');

  instance = new JSEncrypt();

  instance.setPublicKey(pubKey);
}

export default {
  encrypt,
  decrypt
};
