// 文书service
const Service = require('egg').Service;
const documentDao = require('../model/document_model');
const Util = require('../util/index');

module.exports = {
    async insertDocument (dname, courtproceed, dtype, resotime, abstract, ispublic, unpubreason, createuid, updateuid) {
        let res = await documentDao.addDocument(dname, courtproceed, dtype, resotime, abstract, ispublic, unpubreason, createuid, updateuid);
    },

    async getAllDocuments () {
        let res = await documentDao.getAllDocuments();
    },

    async getSpecialDocument () {

    },

    async deleteSpecialDocument () {

    },

    async updateSpecialDocument () {

    }
}