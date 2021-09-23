var express = require('express');

const port = 8080

var app = express();

app.use(express.static(__dirname + '/views'))

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard.html')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})