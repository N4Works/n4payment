"use strict";
var fs = require("fs");
var os = require("os");
var user_model_1 = require("../models/user_model");
var user_service_1 = require("./user_service");
;
var LoginService = (function () {
    function LoginService() {
    }
    LoginService.prototype.getUserByToken = function (token) {
        return new Promise(function (resolve, reject) {
            if (!token) {
                return reject("Token inválido.");
            }
            fs.readFile(os.tmpdir() + "/" + token, function (error, data) {
                if (!!error) {
                    return reject(error);
                }
                resolve(new user_model_1.User(JSON.parse(data.toString())));
            });
        });
    };
    LoginService.prototype.login = function (login) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var userService = new user_service_1.UserService();
            return userService.find(login)
                .then(function (users) {
                if (!users || !users.length) {
                    return reject("Usuário ou senha inválidos.");
                }
                login.user = users[0];
                login.token = "token";
                fs.writeFile(os.tmpdir() + "/" + login.token, JSON.stringify(login.user), function (error) {
                    if (!!error) {
                        return reject(error);
                    }
                    resolve(login);
                });
            });
        });
    };
    LoginService.prototype.logout = function (token) {
        return new Promise(function (resolve, reject) {
            if (!token) {
                return reject("Token inválido.");
            }
            fs.unlink(os.tmpdir() + "/" + token, function (error) {
                if (!!error) {
                    return reject(error);
                }
                resolve();
            });
        });
    };
    return LoginService;
})();
exports.LoginService = LoginService;
;
