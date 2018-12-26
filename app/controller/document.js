'use strict';

const Controller = require('egg').Controller;

class DocumentController extends Controller {
    async insertDocument () {
        let { ctx } = this;
        try {
            let res = await ctx.service.document.insertDocument(ctx.request.body);
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

    async fetchDocumentLists () {
        let { ctx } = this;
        try {
            let res = await ctx.service.document.getAllDocuments();
            ctx.body = {
                success:true,
                data:res
            }
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async fetchDocumentDetail () {
        let { ctx } = this;
        try {
            let res = await ctx.service.document.getSpecialDocument(ctx.request.body.docid);
            ctx.body = {
                success:true,
                data:res
            }
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async deleteSpecialDocument () {
        let { ctx } = this;
        try {
            let res = await ctx.service.document.deleteSpecialDocument(ctx.request.body.docid);
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

    async updateDocument () {

    }
}

module.exports = DocumentController;