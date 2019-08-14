const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const multer = require('multer');
const bodyParser = require('body-parser');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var engine = require('ejs-mate');
const app = express();

global.modelAbstract = require('./model/modelAbatract');

//clientt interactive databse, may need another databse for admin...
global.db = mongoose.connect("mongodb://127.0.0.1:27017/client", {
    useNewUrlParser: true
});

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
    resave: true,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer());

//set up static dictionary
app.use(express.static(path.join(__dirname, 'public')));

//set local user to session user
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    const err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});

require('./routes')(app);

app.get('/', (req, res) => {
    res.render('login');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(3000, () => {
    console.log("Listening on localhost:3000");
});
