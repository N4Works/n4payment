"use strict";

import express = require("express");
import {IUser} from "../models/user_model";
import {ILoginService, LoginService} from "../services/login_service";

export var loginAdmin = (request: express.Request, response: express.Response, next: Function) => {
    var loginService: ILoginService = new LoginService();
    loginService.getUserByToken(request.cookies.token)
        .then((user: IUser) => {
            console.log("login " + user.email);
            request.user = user;
            next();
        })
        .catch(e => response.status(500).json(`Ocorreu o seguinte erro no servidor: ${e}`));
};

export default loginAdmin;
