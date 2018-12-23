'use strict';

const Controller = require('egg').Controller;

class LocalController extends Controller {
    async insertLocal () {
        try {
            let { ctx } = this;
            let { locname } = ctx.request.body;
            let res = await ctx.service.local.insert(locname);
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
            let { ctx } = this;
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async deleteLocal () {
        try {
            let { ctx } = this;
            let { locid } = ctx.request.body;
            let res = await ctx.service.local.delete(locid);
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
            let { ctx } = this;
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async updateLocal () {
        try {
            let { ctx } = this;
            let {
                locid,
                locname
            } = ctx.request.body;
            let res = await ctx.service.local.update({
                locid,
                locname
            });
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
            let { ctx } = this;
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async getLocal () {
        try {
            let { ctx } = this;
            let res = await ctx.service.local.fetch();
            ctx.body = {
                success:true,
                data:res
            }
        } catch (e) {
            let { ctx } = this;
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }
};

module.exports = LocalController;