const Query = require('../db/mysql');
const Util = require('../util/index');

module.exports = {
    /**
     * 
     * @param {Object} court 插入的法院信息 
     */
    async insertCourt (court) {
        try {
            let courtid = Util.createUUID();
            let {
                courtname,
                createuid,
                updateuid,
                locid
            } = court;
            let res = await Query('INSERT INTO Court(courtid, courtname, createuid, updateuid)',
                                   courtid, courtname, createuid, updateuid);
            let lc_res = await Query('INSERT INTO LC(locid, courtid) VALUES (?, ?)',
                                      locid, courtid);
            if (res.affectedRows > 0 &&
                lc_res.affectedRows > 0) {
                    return true;
            } else {
                return false;
            }
        } catch (e) {
            return {
                err:e
            };
        }
    },

    /**
     * 根据法院id删除特定法院
     * @param {String} courtid 法院id
     */
    async deleteSpecificCourt (courtid) {
        try {
            let res = await Query('DELETE FROM Court WHERE courtid=?', courtid);
            let lc_res = await Query('DELETE FROM LC WHERE courtid=?', courtid);
            if (res.affectedRows > 0 &&
                lc_res.affectedRows > 0) {
                    return true;
            } else {
                return false;
            }
        } catch (e) {
            return {
                err:e
            };
        }
    },

    async updateSpecificCourt (court) {
        try {
            let {
                courtid,
                courtname,
                updateuid
            } = court;
            let res = await Query(`UPDATE Court SET courtname = ?,
                                                    updateuid = ? WHERE courtid=?`,
                                                    courtname,
                                                    updateuid,
                                                    courtid);
            if (res.affectedRows > 0) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return {
                err:e
            };
        }
    }
}