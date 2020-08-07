
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
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
});

app.get('/', (req, res) => res.send('Hello Worldaa!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))