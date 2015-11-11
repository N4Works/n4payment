"use strict";
var express = require("express");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var user_route_1 = require("./routes/user_route");
var sender_route_1 = require("./routes/sender_route");
var checkout_route_1 = require("./routes/checkout_route");
var pagseguro_route_1 = require("./routes/pagseguro_route");
var login_route_1 = require("./routes/login_route");
var login_middleware_1 = require("./middlewares/login_middleware");
var application = express();
mongoose.connect("mongodb://localhost/n4-payment", function (error) {
    if (error) {
        return console.log("Erro ao conectar no mongodb: " + error);
    }
});
application.use(cookieParser());
application.use("/api/login", login_route_1.Router(application));
application.use("/api/users", login_middleware_1.default, user_route_1.Router(application));
application.use("/api/senders", login_middleware_1.default, sender_route_1.Router(application));
application.use("/api/checkouts", login_middleware_1.default, checkout_route_1.Router(application));
application.use("/api/pagseguro", pagseguro_route_1.Router(application));
application.use("/", express.static("./public"));
application.use("/node_modules", express.static("./node_modules"));
application.listen(3000, function () { return console.log("Rodando na porta 3000"); });
