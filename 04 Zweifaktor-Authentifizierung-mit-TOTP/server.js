var speakeasy = require('speakeasy')
var express = require('express');

const port = 3000

var app = express();

app.set('views', './views')
app.set('view engine', 'jade')

app.get('/', (req, res) => {
    // https://www.npmjs.com/package/speakeasy
    res.send(speakeasy.totp({ secret: '4LRW4HZQCC52QP7NIEMCIT4FXYOLWI75', digits: 7, step: 10}))
    return;

    res.render('index', locals)
})

app.get('/verify', function (req, res) {
    if (verifyToken(req.query.token)) {
        res.send('Verified');
    } else {
        res.send('Failed to verify');
    }
});

function verifyToken(token) {
    console.log(speakeasy.totp({ secret: '4LRW4HZQCC52QP7NIEMCIT4FXYOLWI75', digits: 7, period: 10 }))
    let result = speakeasy.totp.verify({ secret: '4LRW4HZQCC52QP7NIEMCIT4FXYOLWI75', encoding: 'base32', token: token })
    console.log(result)
    return result
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})