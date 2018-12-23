const Query = require('../db/mysql');
const Util = require('../util/index');

module.exports = {
  /**
     * 用于搜寻特定用户的方法
     * @param {string} account 账户
     */
  async findSpecialUser(account) {
    try {
      const res = await Query('SELECT * FROM User WHERE account = ?', account);
      return res[0];
    } catch (e) {
      console.log(e);
      return {
        err:e
      }
    }
  },

  async insertUser(account, passwd, nickname) {
    try {
      let res = await Query('INSERT INTO User(account, password, nickname) values(?, ?, ?)', account, Util.sha1(passwd), nickname);
      if (res.affectedRows == 1) {
        return true;
      } else 
        return false;
    } catch(e) {
      console.log(e);
      return {
        err:e
      }
    }
  },
};
