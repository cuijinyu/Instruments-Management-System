const Service = require('egg').Service;
const Dao = require('../model/legalcase_model');
const Util = require('../util/index');

class LegalCaseService extends Service {
    async insertLegalCase (legalCase) {
        let { ctx } = this;
        try {
            let createuid = ctx.userInfo.uid;
            legalCase.createuid = createuid;
            let res = await Dao.insertLegalCase(legalCase);
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

    async deleteLegalCase (caseid) {
        let { ctx } = this;
        try {
            let res = await Dao.deleteSpecialLegalCase(caseid);
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

    async fetchLegalCases () {
        let { ctx } = this;
        try {
            let res = await Dao.getLegalCases();
            return res;
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async updateLegalCase (legalCase) {
        let { ctx } = this;
        try {
            let updateuid = ctx.userInfo.uid;
            legalCase.updateuid = updateuid;
            let res = await Dao.updateSpecialLegalCase(legalCase);
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
}

module.exports = LegalCaseService;