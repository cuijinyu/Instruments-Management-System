const Service = require('egg').Service;
const Dao = require('../model/provision_model');
const Util = require('../util/index');

class ProvisionService extends Service {
    async insertProvision (provision) {
        let { ctx } = this;
        try {
            let createuid = ctx.userInfo.uid;
            let updateuid = createuid;
            provision.createuid = createuid;
            provision.updateuid = updateuid;
            let res = await Dao.insertProvision(provision);
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

    async deleteSpecificProvision (provid) {
        let { ctx } = this;
        try {
            let res = await Dao.deleteSpecificProvision(provid);
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

    async updateSpecificProvision (provision) {
        let { ctx } = this;
        try {
            let updateuid = ctx.userInfo.uid;
            provision.updateuid = updateuid;
            let res = await Dao.updeteSpecificProvision(provision);
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

    async fetchProvisions (provid) {
        let { ctx } = this;
        try {
            let res = await Dao.fetchAllProvisions();
            return res;
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }
}

module.exports = ProvisionService;