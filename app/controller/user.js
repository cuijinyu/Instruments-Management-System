'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');    //  用于签发token
const util = require('../util/index');
class UserController extends Controller {
    /**
     * 登录
     */
    async login () {
        try {
            const { ctx } = this;
            let { account, passwd } = ctx.request.body;
            let login_flag = await this.ctx.service.user.login(account, passwd);
            let user_info = await this.ctx.service.user.getUserInfo(account);
            if (login_flag) {
                ctx.body = {
                    success:true,
                    token:util.getToken({
                        ...user_info
                    })
                }
            } else {
                ctx.body = {
                    success:false,
                    msg:"账户密码错误",
                }
            }
        } catch (e) {
            const { ctx } = this;
            ctx.logger.error(e);
            ctx.body = {
                success:false,
                msg:"内部错误",
            }
        }
    }

    /**
     * 注册
     */
    async signin () {
        const { ctx } = this;
        let { account, passwd, nickname } = ctx.request.body;
        let res = await ctx.service.user.signin(account, passwd, nickname);
        if (res) {
            ctx.body = {
                success:true
            }
        } else {
            ctx.body = {
                success:false
            }
        }
    }

    async loginpage () {
        const { ctx } = this;
        ctx.body = "登录页面";
    }

    async signinpage () {
        const { ctx } = this;
        ctx.body = "注册页面";
    }

    async userinfo () {
        const { ctx } = this;
        ctx.body = {
            info:ctx.userInfo
        }
    }
}
module.exports = UserController;