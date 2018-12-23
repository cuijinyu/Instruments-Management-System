'use strict';

const Controller = require('egg').Controller;

class CourtController extends Controller {
    async insertCourt () {
        let { ctx } = this;
        try {
            let {
                courtname
            } = ctx.request.body;
            let res = await ctx.service.court.insert(courtname);
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

    async fetchCourts () {
        let { ctx } = this;
        try {
            let res = await ctx.service.court.fetch();
            ctx.body = {
                success:true,
                data:res
            }
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async deleteSpecificCourt () {
        let { ctx } = this;
        try {
            let {
                courtid
            } = ctx.request.body;
            let res = await ctx.service.delete(courtid);
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

    async updateSpecificCourt () {
        let { ctx } = this;
        try {
            let newCourtInfo = ctx.request.body;
            let res = await ctx.service.court.update(newCourtInfo);
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
};

module.exports = CourtController;