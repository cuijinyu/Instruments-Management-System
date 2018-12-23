'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // INDEX
  router.get('/', controller.home.index);

  // USER
  router.get('/login', controller.user.loginpage);  
  router.get('/signin', controller.user.signinpage);
  router.post('/login', controller.user.login);
  router.post('/signin', controller.user.signin);
  router.get('/userinfo', app.jwt, controller.user.userinfo);


  // LOCAL
  router.post('/insertLocal', app.jwt, controller.local.insertLocal);
  router.post('/deleteLocal', app.jwt, controller.local.deleteLocal);
  router.post('/updateLocal', app.jwt, controller.local.updateLocal);
  router.get('/fetchLocals', app.jwt, controller.local.getLocal);


  // COURT
  router.post('/insertCourt', app.jwt, controller.court.insertCourt);
  router.post('/deleteCourt', app.jwt, controller.court.deleteSpecificCourt);
  router.post('/updateCourt', app.jwt, controller.court.updateSpecificCourt);
  router.get('/fetchCourts', app.jwt, controller.court.fetchCourts);


  // PROVISION
  router.post('/insertProvision', app.jwt, controller.provision.insertProvision);
  router.post('/deleteProvision', app.jwt, controller.provision.deleteProvision);
  router.post('/updateProvision', app.jwt, controller.provision.updateProvision);
  router.get('/fetchProvision', app.jwt, controller.provision.fetchProvisions);


  // LEGALCASE
  router.post('/insertLegalCase', app.jwt, controller.legalCase.insertLegalCase);
  router.post('/deleteLegalCase', app.jwt, controller.legalCase.deleteLegalCase);
  router.post('/updateLegalCase', app.jwt, controller.legalCase.updateLegalCase);
  router.get('/fetchLegalCase', app.jwt, controller.legalCase.fetchLegalCases);
};
