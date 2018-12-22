const Query = require('../db/mysql');
const Util = require('../util/index');

module.exports = {
    /**
     * 插入一条法条信息
     * @param {Object} provision  法条信息
     */
    async insertProvision (provision) {
        let provid = Util.createUUID();
        let {
            ptype,
            article,
            createuid,
            updateuid
        } = provision;
        let res = await Query('INSERT INTO Provision(provid, ptype, article, createuid, updateuid) VALUES (?, ?, ?, ?, ?)',
                                provid,
                                ptype,
                                article,
                                createuid,
                                updateuid);
        if (res.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 删除一条特定的法条
     * @param {String} provid 法条ID 
     */
    async deleteSpecificProvision (provid) {
        let res = await Query('DELETE FROM Provision WHERE provid=?', provid);
        if (res.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 修改旧的法条信息
     * @param {Object} provision 新的法条信息 
     */
    async updeteSpecificProvision (provision) {
        let = {
            provid,
            ptype,
            article,
            updateuid
        } = provision;
        let res = await Query(`UPDATE Provision SET ptype = ?,
                                                    article = ?,
                                                    updateuid = ? WHERE provid=?`,
                                                    ptype,
                                                    article,
                                                    updateuid,
                                                    provid);
        if (res.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    }
}