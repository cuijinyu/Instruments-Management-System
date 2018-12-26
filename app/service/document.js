// 文书service
const Service = require('egg').Service;
const documentDao = require('../model/document_model');
const Util = require('../util/index');

class DocumentService extends Service {
    async insertDocument (document) {
        let { ctx } = this;
        try {
            let createuid = ctx.userInfo.uid;
            document.updateuid = createuid;
            document.createuid = createuid;
            let res = await documentDao.addDocument(document);
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

    async getAllDocuments () {
        let { ctx } = this;
        try {
            let res = await documentDao.fetchDocumentLists();
            return res;
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async getSpecialDocument (docid) {
        let { ctx } = this;
        try {
            let res = await documentDao.fetchSpecificDocument(docid);
            return res;
        } catch (e) {
            ctx.logger.error(e);
            ctx.body = "internal error";
        }
    }

    async deleteSpecialDocument (docid) {
        let { ctx } = this;
        try {
            let res = await documentDao.deleteSpecialDocument(docid);
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

    async updateSpecialDocument (document) {
        let { ctx } = this;
        try {
            let res = await documentDao.updateSpecificDocDetail(document);
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

module.exports = DocumentService;