"use strict";
var consts = require("../constants");
var nodemailer = require("nodemailer");
var EmailService = (function () {
    function EmailService() {
    }
    EmailService.prototype.send = function (email) {
        return new Promise(function (resolve, reject) {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: consts.EMAIL_USER,
                    pass: consts.EMAIL_PASSWORD
                }
            });
            transporter.sendMail({
                to: email.email,
                subject: email.subject,
                text: email.message
            }, function (error, response) {
                if (error) {
                    return reject("Ocorreu o seguinte problema ao enviar e-mail para " + email.email + ": " + error + ".");
                }
                return resolve();
            });
        });
    };
    return EmailService;
})();
exports.EmailService = EmailService;
