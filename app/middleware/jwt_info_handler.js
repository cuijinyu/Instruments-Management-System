const util = require('../util/index');
module.exports = (options, app) => {
  return async (ctx, next) => {
    try {
      if (ctx.headers.authorization) {
        let info = util.getTokenInfo(ctx.headers.authorization);
        ctx.userInfo = info;
        await next();
      } else {
        await next();
      }
    } catch (err) {
      ctx.status = 401;
      ctx.body = '错误身份信息';
      throw err;
    }
  };
};
