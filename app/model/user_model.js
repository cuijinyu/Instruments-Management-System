const Query = require('../db/mysql');
const Util = require('../util/index');

module.exports = {
  /**
     * 用于搜寻特定用户的方法
     * @param {string} account 账户
     */
  async findSpecialUser(account) {
    const res = await Query('SELECT * FROM User WHERE account = ?', account);
    return res[0];
  },

  async insertUser(account, passwd, nickname) {
    let res = await Query('INSERT INTO User(account, password, nickname) values(?, ?, ?)', account, Util.sha1(passwd), nickname);
    if (res.affectedRows == 1) {
      return true;
    } else 
      return false;
  },
};
