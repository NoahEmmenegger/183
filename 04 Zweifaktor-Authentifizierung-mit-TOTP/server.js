var speakeasy = require('speakeasy')
var express = require('express');
var qr = require('qr-image');

let users = require('./users.json')

const port = 8080

var app = express();

app.use(express.static(__dirname + '/views'))

app.get('/', (req, res) => {
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

    const username = req.query.username
    const user = username && users.find(x => x.user == username);
    
    if (verifyToken(user.secretToken, req.query.token)) {
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

function verifyToken(secret, token) {
    let result = speakeasy.time.verify({ secret: secret, encoding: 'base32', token: token })
    return result
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})