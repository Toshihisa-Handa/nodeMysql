
//port3000での接続
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser')



//expressからmysqlの接続
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'express_db'
});

//読み込んだbodyParserをミドルウェアとして設定
app.use(bodyParser.urlencoded({ extended: true}));


//データベース接続(最初の環境設定（DBやtableに使用した後は不要)
// con.connect(function(err) {
//   if (err) throw err;
//   console.log('Connected');

//データベースの作成と接続(この記述でデータベースが作られる。記述後ターミナルでサーバーが更新されるとデータベース不要になるので消す)
//   con.query('CREATE DATABASE express_db', function(err, result){
//       if(err)throw err;
//       console.log('database createde')
//   });

//テーブル作成の記述（データベース同様読み込まれると不要になる）
//   const sql ='CREATE TABLE users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255)NOT NULL)';
//   con.query(sql, function(err, result){
//       if(err)throw err;
//       console.log('table created');
//   });

//select文でsql取得
// const sql = 'select * from users'
// con.query(sql, function(err, result, fields){
//     if(err)throw err;
//     // console.log(result)
//     console.log(result[0].email)
// });

  //insert文にて登録の実行
  //エディタが更新されるたびに実行されるので、１回実行したらコメントアウト or 削除する
   //パターン①
//    const sql = "INSERT INTO users(name,email) VALUES('kevin','kevin@test.com')"
//    con.query(sql,function(err, result, fields){
// 	if (err) throw err;
// 	console.log(result)
// })

    //パターン②
// const sql = "INSERT INTO users(name,email) VALUES(?,?)"
// con.query(sql,['Jack','jack@exsample.co.jp'],function(err, result, fields){
//     if (err) throw err;
//     console.log(result)
// })

    //パターン③
// const sql = "INSERT INTO users SET ?"
// con.query(sql,{name:'Tommy', email:'Tommy@test.com'},function(err, result, fields){
// 	if (err) throw err;
// 	console.log(result)
// })


// });


//select文で取得したデータをブラウザで表示
// app.get('/', (request, response) => {
//   //select文にてブラウザ上の表示  
//   const sql = 'select * from users'
//   con.query(sql, function(err, result, fields){
//       if(err)throw err;
//       response.send(result)
//   });

// })




//localhost:3000で呼び出されるルートの定義
//sendFileメソッドを使用して、html/form.htmlファイルを”/(ルート)”にアクセスしてきたブラウザに渡しています。
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname,'html/form.html')))
    // res.sendFile(path.join(`${__dirname}/html/form.html`)))↑と同じ意味
    
    //req, resにインプットタグから送信されたデータが入っていて、送信された内容がreq.bodyで表示される
app.post('/', (req, res) => {
	const sql = "INSERT INTO users SET ?"

	con.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.send('登録が完了しました');

	});
});


//サーバーの接続状態の確認用コンソール
app.listen(port, () => console.log(`Example app listening on port ${port}!`))