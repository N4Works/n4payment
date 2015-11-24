"use strict";
var express = require("express");
var consts = require("../constants");
var login_service_1 = require("../services/login_service");
exports.Router = function (server) {
    var router = express.Router(server);
    router
        .route("/")
        .post(function (request, response, next) {
        var loginData = request.body;
        var loginService = new login_service_1.LoginService();
        loginService.login(loginData)
            .then(function () {
            response.status(200).json({
                message: "Verifique o e-mail de acesso em " + loginData.user.email + "."
            });
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
        loginService.getUserByToken(request.cookies.token, true)
            .then(function (user) {
            response.status(200).json(user);
        })
            .catch(function (error) { return next(error); });
    });
    router
        .route("/:token")
        .get(function (request, response, next) {
        var loginService = new login_service_1.LoginService();
        loginService.getUserByToken(request.params.token)
            .then(function (user) {
            response.status(301).cookie("token", request.params.token, {
                maxAge: process.env.COOKIE_EXPIRATION_TIME || 3600000
            }).redirect(consts.BASE_URL);
        })
            .catch(function (error) { return next(error); });
    });
    return router;
};
