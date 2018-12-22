const Query = require('../db/mysql');
const Util = require('../util/index');

module.exports = {
    /**
     * 插入案件
     * @param {Object} legalCase 拥有案件详情数据的对象
     */
    async insertLegalCase (legalCase) {
        let caseid = Util.createUUID();
        let {
            causes,
            ctype,
            content,
            createuid,
            updateuid,
            courtid
        } = legalCase;
        let res = await Query('INSERT INTO LegalCase(caseid, causes, ctype, content, createuid, updateuid) VALUES (?, ?, ?, ?, ?, ?)', 
                    caseid,
                    causes,
                    ctype,
                    content,
                    createuid,
                    updateuid);
        let clcRes = await Query('INSERT INTO CLC(courtid, caseid) VALUES (?, ?)',
                    courtid,
                    caseid);
        if (res.affectedRows > 0&&
            clcRes.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 根据案件ID删除具体案件
     * @param {string} caseid 案件ID 
     */
    async deleteSpecialLegalCase (caseid) {
        let clcRes = await Query('DELETE FROM CLC WHERE caseid=?', caseid);
        let res = await Query('DELETE FROM LegalCase WHERE caseid=?', caseid);
        if (clcRes.affectedRows > 0&&
            res.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    },

    async updateSpecialLegalCase (legalCase) {
        let { 
            caseid,
            causes,
            ctype,
            content,
            updateuid } = legalCase;
        // let oldCase = await Query('SELECT * FROM LegalCase WHERE caseid = ?', caseid);
        let res = await Query(`UPDATE LegalCase SET causes = ?,
                                                    ctype = ?,
                                                    content = ?,
                                                    updateuid = ?
                                                     WHERE caseid=?`,
                                                     causes,
                                                     ctype,
                                                     content,
                                                     updateuid,
                                                     caseid);
        if (res.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
}