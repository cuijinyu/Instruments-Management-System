'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.get('/login', controller.user.loginpage);

  router.get('/signin', controller.user.signinpage);

  router.post('/login', controller.user.login);

  router.post('/signin', controller.user.signin);

  router.get('/userinfo', app.jwt, controller.user.userinfo);

  
};
