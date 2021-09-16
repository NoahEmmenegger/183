var speakeasy = require('speakeasy')
var express = require('express');

const port = 8080

var app = express();

app.use(express.static(__dirname + '/views'))

app.get('/', (req, res) => {
    // https://www.npmjs.com/package/speakeasy
    //res.send(speakeasy.totp({ secret: '4LRW4HZQCC52QP7NIEMCIT4FXYOLWI75', digits: 7, step: 10}))
    //return;

    res.render('index')
})

app.get('/verify', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    
    if (verifyToken(req.query.token)) {
        res.end(JSON.stringify({ message: 'Verified' }));
    } else {
        res.end(JSON.stringify({ message: 'Failed to verify' }));
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