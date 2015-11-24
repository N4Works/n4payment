"use strict";

import express = require("express");
import consts = require("../constants");
import {ILogin} from "../models/login_model";
import {IUser} from "../models/user_model";
import {ILoginService, LoginService} from "../services/login_service";

export var Router = (server: express.Router) => {
    var router: express.Router = express.Router(server);

    router
        .route("/")
        .post((request: express.Request, response: express.Response, next: Function) => {
            var loginData: ILogin = request.body;
            var loginService: ILoginService = new LoginService();
            loginService.login(loginData)
                .then(() => {
                response.status(200).json({
                    message:`Verifique o e-mail de acesso em ${loginData.user.email}.`
                });
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
            loginService.getUserByToken(request.cookies.token, true)
                .then((user: IUser) => {
                    response.status(200).json(user);
                })
                .catch((error: any) => next(error));
        });

    router
        .route("/:token")
        .get((request: express.Request, response: express.Response, next: Function) => {
            var loginService: ILoginService = new LoginService();
            loginService.getUserByToken(request.params.token)
                .then((user: IUser) => {
                    response.status(301).cookie("token", request.params.token, {
                        maxAge: process.env.COOKIE_EXPIRATION_TIME || 3600000 // 60 minutos
                    }).redirect(consts.BASE_URL);
                })
                .catch((error: any) => next(error));
        });

    return router;
};
