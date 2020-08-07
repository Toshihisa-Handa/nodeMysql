
//port3000での接続
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser')//body-parserライブラリ取得￥
const ejs = require('ejs')//ejsライブラリ取得


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

//ejsを利用するための設定
app.set('view engine', 'ejs');


//ejsファイルの設定
app.get('/', (req, res) => {
    const sql = 'select * from users';
    con.query(sql, function (err, result, fields){
        if(err)throw err;
        res.render('index', {users: result});//indexは「views/index.ejs」をさす
    });
});


app.post('/', (req, res) => { //req, resにインプットタグから送信されたデータが入っていて、送信された内容がreq.bodyで登録される
	const sql = "INSERT INTO users SET ?"
	con.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
        // res.send('登録が完了しました');
        res.redirect('/')
       //res.send(‘登録が完了しました’)ではなくres.redirect(‘/’)に設定すると”/(ルート)”にリダイレクトされ、追加した行が表示されます。
	});
});


//localhost:3000で呼び出されるルートの定義
//sendFileメソッドを使用して、html/form.htmlファイルを”/(ルート)”にアクセスしてきたブラウザに渡しています。
app.get('/create', (req, res) =>
    res.sendFile(path.join(__dirname,'html/form.html')))
    // res.sendFile(path.join(`${__dirname}/html/form.html`)))↑と同じ意味
    
   





//サーバーの接続状態の確認用コンソール
app.listen(port, () => console.log(`Example app listening on port ${port}!`))