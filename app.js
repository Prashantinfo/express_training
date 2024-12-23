var createError = require('http-errors');
const mongoose = require('mongoose');
const ideasRouter = require('./routes/ideaRoute');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoute');


var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/ideas', ideasRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);






//-----------------------------------MongoConnect-----------------------//

mongoose.connect('mongodb://localhost:27017/mycruddb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));




module.exports = app;
