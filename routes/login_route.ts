"use strict";

import express = require("express");
import bodyParser = require("body-parser");
import {ILogin} from "../models/login_model";
import {IUser} from "../models/user_model";
import {ILoginService, LoginService} from "../services/login_service";

export var Router = (server: express.Router) => {
    var router: express.Router = express.Router(server);

    router
        .route("/")
        .post(bodyParser.json({}),
        (request: express.Request, response: express.Response, next: Function) => {
            var loginData: ILogin = request.body;
            var loginService: ILoginService = new LoginService();
            loginService.login(loginData)
                .then((login: ILogin) => {
                response.status(200).cookie("token", login.token, {
                    maxAge: process.env.COOKIE_EXPIRATION_TIME || 3600000 // 60 minutos
                }).json(login.user);
            })
                .catch((error: any) => next(error));
        })
        .delete((request: express.Request, response: express.Response, next: Function) => {
        var loginService: ILoginService = new LoginService();
        loginService.logout(request.cookies.token)
            .then(() => response.status(204).clearCookie("token").end())
            .catch((error: any) => next(error));
    })
        .get((request: express.Request, response: express.Response, next: Function) => {
            var loginData: ILogin = request.query;
            var loginService: ILoginService = new LoginService();
            loginService.getUserByToken(request.cookies.token)
                .then((user: IUser) => {
                    response.status(200).json(user);
                })
                .catch((error: any) => next(error));
        });

    return router;
};
