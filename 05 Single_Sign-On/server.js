var express = require('express');
var bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");

const {OAuth2Client} = require('google-auth-library');

let users = require('./users.json')

const port = 5000

var app = express();

var jsonParser = bodyParser.json()

const CLIENT_ID = '1086787687783-5vfu7ee5o807vp4e844r907b6k67nu53.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

app.use(express.static(__dirname + '/views'))
app.engine('html', require('ejs').renderFile);

app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/dashboard', checkAuthenticated, (req, res) => {
    let user = req.user;
    res.render('dashboard.html', {user})
})

app.get('/403', (req, res) => {
    res.send('You have no access')
})

app.post('/login', jsonParser, (req, res) => {
    let token = req.body.token;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '1086787687783-5vfu7ee5o807vp4e844r907b6k67nu53.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        const email = payload['email']
        if(!users.find(x => x.email == email)) {
            users.push({
                userid: userid,
                email: email
            })
        }
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success')
        })
        .catch(console.error);

})

function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/403')
      })

}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})