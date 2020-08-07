
//port3000での接続
const express = require('express')
const app = express()
const port = 3000



//expressからmysqlの接続
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
  database:'express_db'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
  //データベースの作成と接続(この記述でデータベースが作られる。記述後ターミナルでサーバーが更新されるとデータベース不要になるので消す)
  con.query('CREATE DATABASE express_db', function(err, result){
      if(err)throw err;
      console.log('database createde')
  });
});

app.get('/', (req, res) => res.send('Hello Worldaa!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))