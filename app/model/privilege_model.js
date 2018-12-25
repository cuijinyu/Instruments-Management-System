const Query = require('../db/mysql');
const Util = require('../util/index');

module.exports = {
    /**
     * 插入用户的权限
     * @param {Object} privilege 
     */
    async insertPrivilege (privilege) {
        try {
            let {
                uid,
                userpro,
                courtpro,
                provpro,
                casepro,
                docpro,
                locpro
            } = privilege;
            let res = await Query('INSERT INTO Privilege VALUES(?,?,?,?,?,?,?)',
                                   uid, userpro, courtpro, provpro, casepro, docpro, locpro);
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
     * 更新用户权限
     * @param {Object} privilege 新的权限对象 
     */
    async updatePrivilege (privilege) {
        try {
            let {
                uid,
                userpro,
                courtpro,
                provpro,
                casepro,
                docpro,
                locpro
            } = privilege;
            let res = Query(`UPDATE Privilege SET userpro = ?,
                                                  courtpro = ?,
                                                  provpro = ?,
                                                  casepro = ?,
                                                  docpro = ?,
                                                  locpro = ? where uid = ?`,
                            userpro, courtpro, provpro, casepro, docpro, locpro, uid);
            if (res.affectedRows > 0) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return {
                err:e
            }
        }
    },

    /**
     * 根据特定的用户ID获取用户的权限信息
     * @param {String} uid 用户ID 
     */
    async fetchSpecificUserPrivilege (uid) {
        try {
            let res = await Query('SELECT * FROM Privilege WHERE uid = ?', uid);
            return res;
        } catch (e) {
            return {
                err:e
            }
        }
    }   
}