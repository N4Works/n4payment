"use strict";
var login_service_1 = require("../services/login_service");
exports.loginAdmin = function (request, response, next) {
    var loginService = new login_service_1.LoginService();
    loginService.getUserByToken(request.cookies.token)
        .then(function (user) {
        console.log("login " + user.email);
        request.user = user;
        next();
    })
        .catch(function (e) { return response.status(500).json("Ocorreu o seguinte erro no servidor: " + e); });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.loginAdmin;
