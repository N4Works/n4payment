"use strict";
var user_model_1 = require("../models/user_model");
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.find = function (filtro) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return user_model_1.User.find(filtro, function (error, users) {
                return (!!error) ? reject(error) : resolve(users);
            });
        });
    };
    UserService.prototype.findById = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return user_model_1.User.findById(id, function (error, user) {
                return (!!error) ? reject(error) : resolve(user);
            });
        });
    };
    UserService.prototype.insert = function (userData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var user = new user_model_1.User(userData);
            user.save(function (error) { return !!error ? reject(error) : resolve(user); });
        });
    };
    UserService.prototype.update = function (id, userData) {
        var self = this;
        return new Promise(function (resolve, reject) {
            user_model_1.User.findByIdAndUpdate(id, {
                $set: userData
            }, function (error, user) { return !!error ? reject(error) : resolve(user); });
        });
    };
    UserService.prototype.delete = function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            return user_model_1.User.findByIdAndRemove(id, function (error, user) { return !!error ? reject(error) : resolve(user); });
        });
    };
    return UserService;
})();
exports.UserService = UserService;
