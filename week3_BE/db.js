const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: '172.10.7.71',
  user: 'juho',
  password: '1234',
  database: 'madcamp_week3',
  port: 80
});

db.connect((err) => {
  if (err) {
    console.log('MySQL 연결 오류:', err);
    throw err;
  }
  console.log('MySQL에 연결되었습니다.');
});


module.exports = db.promise();
