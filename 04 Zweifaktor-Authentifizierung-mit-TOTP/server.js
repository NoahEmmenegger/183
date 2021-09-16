var speakeasy = require('speakeasy')
var express = require('express');
var qr = require('qr-image');

let users = require('./users.json')

const port = 8080

var app = express();

app.use(express.static(__dirname + '/views'))

app.get('/', (req, res) => {
    // https://www.npmjs.com/package/speakeasy
    //res.send(speakeasy.totp({ secret: '4LRW4HZQCC52QP7NIEMCIT4FXYOLWI75', digits: 7, step: 10}))
    //return;

    res.render('index')
})

app.get('/hasUserSecurityToken', (req, res) => {
    const username = req.query.userName
    const user = username && users.find(x => x.user == username);
    res.send(hasUserToken(user))
})

app.get('/generateSecretForUser', (req, res) => {
    const username = req.query.username
    const user = username && users.find(x => x.user == username);
    if(!hasUserToken(user)) {
        // Generate a secret
        const secret = speakeasy.generateSecret({length: 20, name: `Key von ${username}`})
        user.secretToken = secret.base32

        res.send('/qrcode?qrurl=' + encodeURIComponent(secret.otpauth_url))
    }
})

app.get('/verify', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    
    if (verifyToken(req.query.token)) {
        res.end(JSON.stringify({ message: 'Verified' }));
    } else {
        res.end(JSON.stringify({ message: 'Failed to verify' }));
    }
});

app.get('/qrcode', function(req, res) {
    var code = qr.image(req.query.qrurl, { type: 'png' });
    res.type('png');
    code.pipe(res);
  });

function hasUserToken(user) {
    if (user && user.secretToken !== undefined) {
        return true
    } else {
        return false
    }
}

function verifyToken(token) {
    console.log(speakeasy.time({secret: 'JZ2HMVR2PBEU4OSMNY5EQVDZPNTXIW2B'}))
    let result = speakeasy.time.verify({ secret: 'JZ2HMVR2PBEU4OSMNY5EQVDZPNTXIW2B', encoding: 'base32', token: token })
    console.log(result)
    return result
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})