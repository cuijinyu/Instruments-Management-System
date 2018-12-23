const Query = require('../db/mysql');
const Util = require('../util/index');

module.exports = {
    /**
     * 插入地域信息
     * @param {Object} local 地域信息 
     */
    async insertLocal (local) {
        try {
            let locid = Util.createUUID();
            let {
                locname,
                createuid,
                updateuid
            } = local;
            let res = await Query('INSERT INTO Local(locid, locname, createuid, updateuid) VALUES (?, ?, ?, ?)',
                                   locid, locname, createuid, updateuid);
            if (res.affectedRows > 0) {
                return true;
            } else 
                return false;
        } catch (e) {
            return {
                err:e
            }
        }
    },

    /**
     * 删除地域信息
     * @param {String} locid 地域id 
     */
    async deleteLoc (locid) {
        try {
            let res = await Query('DELETE FROM Local WHERE locid = ?', locid);
            if (res.affectedRows > 0) {
                return true;
            } else 
                return false;
        } catch (e) {
            return {
                err:e
            }
        }
    },

    /**
     * 更新地域信息
     * @param {Object} local 新的地域信息 
     */
    async updateLoc (local) {
        try {
            let = {
                locid,
                locname,
                updateuid
            } = local;
            let res = await Query(`UPDATE Local SET locname = ?,
                                                    updateuid = ? WHERE locid = ?`,
                                                    locname, updateuid, locid);
            if (res.affectedRows > 0) {
                return true;
            } else 
                return false;
        } catch (e) {
            return {
                err:e
            }
        }
    },

    async getLocal () {
        try {
            let res = await Query('SELECT * FROM localUserView');
            return res;
        } catch (e) {
            return {
                err:e
            }
        }
    }
}