
//port3000での接続
const express = require('express')
const app = express()
const port = 3000



//expressからmysqlの接続
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'express_db'
});

//データベース接続
con.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
  //データベースの作成と接続(この記述でデータベースが作られる。記述後ターミナルでサーバーが更新されるとデータベース不要になるので消す)
//   con.query('CREATE DATABASE express_db', function(err, result){
//       if(err)throw err;
//       console.log('database createde')
//   });

//テーブル作成の記述（データベース同様読み込まれると不要になる）
  const sql ='CREATE TABLE users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL)';
  con.query(sql, function(err, result){
      if(err)throw err;
      console.log('table created');
  });
});

app.get('/', (req, res) => res.send('Hello Worldaa!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))