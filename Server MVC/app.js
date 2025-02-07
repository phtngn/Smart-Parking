var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var khachhangRouter = require('./routes/khachhang');
var theRouter = require('./routes/the');
var dangnhapRouter = require('./routes/dangnhap');
var dangxuatRouter = require('./routes/dangxuat');
var dangkyRouter = require('./routes/dangky');
var phuongtienRouter = require('./routes/phuongtien');
var cameraRouter = require('./routes/camera');
var nhanvienRouter = require('./routes/nhanvien');
var taikhoanRouter = require('./routes/taikhoan');

var app = express();

const session = require('express-session');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/', dangnhapRouter);
app.use('/khachhang', khachhangRouter);
app.use('/the', theRouter);
app.use('/dangnhap', dangnhapRouter);
app.use('/dangxuat', dangxuatRouter);
app.use('/dangky', dangkyRouter);
app.use('/phuongtien', phuongtienRouter);
app.use('/camera', cameraRouter);
app.use('/nhanvien', nhanvienRouter);
app.use('/taikhoan', taikhoanRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
