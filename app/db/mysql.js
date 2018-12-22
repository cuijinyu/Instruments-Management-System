const dbConfig = require('../../config/db.config');
const mysql = require('mysql');

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

const Query = (sql, ...params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      connection.query(sql, params, (err, res) => {
        connection.release();
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  });
};

module.exports = Query;
