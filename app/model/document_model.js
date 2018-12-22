const Query = require('../db/mysql');
const Util = require('../util/index');

module.exports = {
    async addDocument (dname, courtproceed, dtype, resotime, abstract, ispublic, unpubreason, createuid, updateuid, rowtext, truth, result, plaintiff, defendant, judge) {
        let docuuid = Util.uuid();
        let detailuuid = Util.uuid();
        let res = await Query('INSERT INTO Document(docid, dname, courtproceed, dtype, resotime, abstract, ispublic, unpubreason, createuid, updateuid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', docuuid, dname, courtproceed, dtype, resotime, abstract, ispublic, unpubreason, createuid, updateuid);
        await Query('INSERT INTO Docdetail(detailid, rowtext, truth, result, plaintiff, defendant, judge) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', detailuuid, rowtext, truth, result, plaintiff, defendant, judge);
        await Query('INSERT INTO DD(docid, detailid) VALUES(?, ?)', docuuid, detailuuid);
        await Query('')
        if (res.affectedRows > 0) {
            return true;
        } else 
            return false;
    },

    async deleteSpecialDocument (docid) {

    }
}