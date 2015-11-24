"use strict";

import express = require("express");
import {IUser} from "../models/user_model";
import {ILoginService, LoginService} from "../services/login_service";

export var loginAdmin = (request: express.Request, response: express.Response, next: Function) => {
    var loginService: ILoginService = new LoginService();
    loginService.getUserByToken(request.cookies.token)
        .then((user: IUser) => {
            if (user) {
                response.cookie("token", request.cookies.token, {
                    maxAge: process.env.COOKIE_EXPIRATION_TIME || 3600000 // 60 minutos
                });
                request.user = user;
            }
            next();
        })
        .catch(e => response.status(401).json(`Ocorreu o seguinte erro no servidor: ${e}`));
};

export default loginAdmin;
