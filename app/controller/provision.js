'use strict';

const Controller = require('egg').Controller;

class ProvisionController extends Controller {
    async insertProvision () {
        let { ctx } = this;
        try {
            let res = await ctx.service.provision.insertProvision(ctx.request.body);
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
            ctx.body = {
                err:e
            }
        }
    }

    async deleteProvision () {
        let { ctx } = this;
        try {
            let { provid } = ctx.request.body;
            let res = await ctx.service.provision.deleteSpecificProvision(provid);
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
            ctx.body = {
                err:e
            }
        }
    }

    async updateProvision () {
        let { ctx } = this;
        try {
            let res = ctx.service.provision.updateSpecificProvision(ctx.request.body);
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
            ctx.body = {
                err:e
            }
        }
    }

    async fetchProvisions () {
        let { ctx } = this;
        try {
            let res = await ctx.service.provision.fetchProvisions();
            ctx.body = {
                success:true,
                data:res
            }
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = {
                err:e
            }
        }
    }
};

module.exports = ProvisionController;