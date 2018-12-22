const Query = require('../db/mysql');

module.exports = {
  async findAllCd() {
    const res = await Query('SELECT * FROM CD');
    return res;
  },

  async insertCD(courtid, docid) {
    const res = await Query('INSERT INTO CD(courtid, docid) VALUES (?, ?)', courtid, docid);
    if (res.affectRows > 0) {
      return true;
    } return false;
  },

  async delectCD(courtid, docid) {
    const res = await Query('DELETE FROM CD WHERE courtid=? AND docid=?', courtid, docid);
    if (res.affectRows > 0) {
      return true;
    } return false;
  },
};
