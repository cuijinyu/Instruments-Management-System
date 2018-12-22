const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should GET /login', () => {
    return app.httpRequest()
      .post('/login', {
        account: 'xlp',
        passwd: 'xlp',
      })
      .assert(res => {
          console.log(res);
      });
  });
});
