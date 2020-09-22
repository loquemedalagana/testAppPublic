const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const socket = require('./socket');

const app = express();
app.set('port', 8000);
app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true
})

app.use(express.static(path.join(__dirname, 'client')));

app.use(cookieParser('MYSECRET'));

app.use(express.urlencoded({extended: false}));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'MYSECRET',
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

app.use(require('./router'));

const PORT = 8000;

const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});


socket(server);