const privilegeDao = require('../model/privilege_model');

module.exports = (options, app) => {
    return async (ctx, next) => {
        try {
            let uid;
            if (ctx.userInfo) {
                uid = ctx.userInfo.uid;
            }
            if (uid) {
                ctx.userInfo.privilege = await privilegeDao.fetchSpecificUserPrivilege(uid);
            }
            await next();
        } catch (e) {
            console.log(e);
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }
}