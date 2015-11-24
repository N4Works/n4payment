"use strict";
var fs = require("fs");
var os = require("os");
var randtoken = require("rand-token");
var consts = require("../constants");
var user_model_1 = require("../models/user_model");
var user_service_1 = require("./user_service");
var email_model_1 = require("../models/email_model");
var email_service_1 = require("./email_service");
;
var LoginService = (function () {
    function LoginService() {
    }
    LoginService.prototype.getUserByToken = function (token, readExpiration) {
        return new Promise(function (resolve, reject) {
            if (!token) {
                return reject("Token inválido.");
            }
            fs.readFile(os.tmpdir() + "/" + token, function (error, data) {
                if (!!error) {
                    return reject(error);
                }
                var login = JSON.parse(data.toString());
                if (readExpiration && +(new Date()) > +login.expiration) {
                    return reject("Token inválido.");
                }
                resolve(new user_model_1.User(login.user));
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
                login.token = randtoken.uid(16);
                login.expiration = new Date();
                login.expiration.setMinutes(login.expiration.getMinutes() + 15);
                var emailService = new email_service_1.EmailService();
                return emailService.send(new email_model_1.Email(login.email, "Acesso ao sistema", consts.BASE_URL + "/api/login/" + login.token))
                    .then(function () {
                    fs.writeFile(os.tmpdir() + "/" + login.token, JSON.stringify(login.user), function (error) {
                        if (!!error) {
                            return reject(error);
                        }
                        resolve(login);
                    });
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
