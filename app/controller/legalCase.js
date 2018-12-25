'use strict';

const Controller = require('egg').Controller;

class LegalCaseController extends Controller {
    async insertLegalCase () {
        let { ctx } = this;
        try {
            let res = await ctx.service.legalCase.insertLegalCase(ctx.request.body);
            if (res) {
                ctx.body = {
                    success:true
                }
            } else {
                ctx.body = {
                    success:false
                }
            }
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async deleteLegalCase () {
        let { ctx } = this;
        try {
            let { caseid } = ctx.request.body;
            let res = await ctx.service.legalCase.deleteLegalCase(caseid);
            if (res) {
                ctx.body = {
                    success:true
                }
            } else {
                ctx.body = {
                    success:false
                }
            }
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async updateLegalCase () {
        let { ctx } = this;
        try {
            let res = await ctx.service.legalCase.updateLegalCase(ctx.request.body);
            if (res) {
                ctx.body = {
                    success:true
                }
            } else {
                ctx.body = {
                    success:false
                }
            }
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async fetchLegalCases () {
        let { ctx } = this;
        try {
            let res = await ctx.service.legalCase.fetchLegalCases();
            ctx.body = {
                success:true,
                data:res
            }
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }
}

module.exports = LegalCaseController;