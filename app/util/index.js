const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v1');

module.exports = {
  sha1(text) {
    let hash = crypto.createHash('sha1');
    hash.update(text);
    return hash.digest('hex');
  },

  getToken(data) {
    return jwt.sign(data, 'IMS', {
      expiresIn: '12h',
    });
  },

  getTokenInfo(token) {
    return jwt.verify(token.split(' ')[1], 'IMS');
  },

  createUUID () {
    return uuid();
  }
};
