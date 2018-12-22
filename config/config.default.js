'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545184183822_9371';

  // add your config here
  config.middleware = ['jwtErrorHandler', 'jwtInfoHandler'];

  config.view = {
    mapping: {
        '.ejs': 'ejs',
        '.nj': 'nunjucks',
    }
  }

  config.jwt = {
    secret: "IMS"
  }

  config.security = {
    csrf: {
      enable: false
    }
  }
  return config;
};