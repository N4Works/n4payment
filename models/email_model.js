"use strict";
var Email = (function () {
    function Email(email, subject, message) {
        this.email = email;
        this.subject = subject;
        this.message = message;
    }
    return Email;
})();
exports.Email = Email;
