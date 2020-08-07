
//port3000での接続
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello Worldaa!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

