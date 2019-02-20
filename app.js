"use strict";
var root = require("app-root-path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var routes = require("./server/routes");
var hooks_1 = require("./server/middlewares/hooks");
// initiating the express
var app = express();
// view engine setup
app.set('views', root + "/server/views/");
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(hooks_1.validationHook);
app.use(cookieParser());
app.use('/', routes);
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log('err', err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
module.exports = app;
