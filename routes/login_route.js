"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var login_service_1 = require("../services/login_service");
exports.Router = function (server) {
    var router = express.Router(server);
    router
        .route("/")
        .post(bodyParser.json({}), function (request, response, next) {
        var loginData = request.body;
        var loginService = new login_service_1.LoginService();
        loginService.login(loginData)
            .then(function (login) {
            response.status(200).cookie("token", login.token, {
                maxAge: process.env.COOKIE_EXPIRATION_TIME || 3600000
            }).json(login.user);
        })
            .catch(function (error) { return next(error); });
    })
        .delete(function (request, response, next) {
        var loginService = new login_service_1.LoginService();
        loginService.logout(request.cookies.token)
            .then(function () { return response.status(204).clearCookie("token").end(); })
            .catch(function (error) { return next(error); });
    })
        .get(function (request, response, next) {
        var loginData = request.query;
        var loginService = new login_service_1.LoginService();
        loginService.getUserByToken(request.cookies.token)
            .then(function (user) {
            response.status(200).json(user);
        })
            .catch(function (error) { return next(error); });
    });
    return router;
};
