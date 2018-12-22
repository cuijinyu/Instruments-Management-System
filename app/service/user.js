const Service = require('egg').Service;
const userDao = require('../model/user_model');
const Util = require('../util/index');

class UserService extends Service {
  async login(account, passwd) {
    const user = await userDao.findSpecialUser(account);
    return user.password == Util.sha1(passwd);
  }

  async signin(account, passwd, nickname) {
    let res = await userDao.insertUser(account, passwd, nickname);
    return res;
  }

  async getUserInfo(account) {
    const user = await userDao.findSpecialUser(account);
    return user;
  }
}
module.exports = UserService;
