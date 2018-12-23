const Service = require('egg').Service;
const Dao = require('../model/local_model');
const Util = require('../util/index');

class LocalService extends Service {
    async insert (locname) {
        try {
            let { ctx } = this;
            let createuid = ctx.userInfo.uid;
            let updateuid = createuid;
            let res = await Dao.insertLocal({
                locname,
                createuid,
                updateuid
            })
            if (typeof res != 'boolean') {
                ctx.logger.error(res.err);
                ctx.body = "internal error";
            } else {
                return res;
            }
        } catch (e) {
            let { ctx } = this;
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async delete (locid) {
        try {
            let { ctx } = this;
            let res = await Dao.deleteLoc(locid);
            return res;
        } catch (e) {
            let { ctx } = this;
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async update (localInfo) {
        try {
            let { ctx } = this;
            let updateuid = ctx.userInfo.uid;
            localInfo.updateuid = updateuid;
            let res = await Dao.updateLoc(localInfo);
            return res;
        } catch (e) {
            let { ctx } = this;
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async fetch () {
        try {
            let locals = await Dao.getLocal();
            return locals;
        } catch (e) {
            let { ctx } = this;
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }
}   

module.exports = LocalService;