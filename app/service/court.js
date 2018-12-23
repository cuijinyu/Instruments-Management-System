const Service = require('egg').Service;
const Dao = require('../model/court_model');
const Util = require('../util/index');

class CourtService extends Service {
    async insert (courtname) {
        let { ctx } = this;
        try {
            let createuid = ctx.userInfo.uid;
            let updateuid = createuid;
            let res = await Dao.insertCourt({
                courtname,
                createuid,
                updateuid
            });
            if (typeof res != 'boolean') {
                ctx.logger.error(res.err);
                ctx.body = "internal error";
            } else {
                return res;
            }
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async delete (courtid) {
        let { ctx } = this;
        try {
            let res = await Dao.deleteSpecificCourt(courtid);
            if (typeof res != 'boolean') {
                ctx.logger.error(res.err);
                ctx.body = "internal error";
            } else {
                return res;
            }
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async update (courtInfo) {
        let { ctx } = this;
        try {
            let updateuid = ctx.userInfo.uid;
            courtInfo.updateuid = updateuid;
            let res = await Dao.updateSpecificCourt(courtInfo);
            if (typeof res != 'boolean') {
                ctx.logger.error(res.err);
                ctx.body = "internal error";
            } else {
                return res;
            }
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async fetch () {
        let { ctx } = this;
        try {
            let res = await Dao.getCourts();
            return res;
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }
}   

module.exports = CourtService;