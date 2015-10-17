"use strict";
var express = require("express");
var mongoose = require("mongoose");
var userRouter = require("./routes/user_route");
mongoose.connect("mongodb://localhost/n4-payment", function (error) {
    if (error) {
        console.log("Erro ao conectar no mongodb: " + error);
    }
});
var application = express();
application.use("/api/users", userRouter.Router(application));
application.use("/", express.static("./public"));
application.use("/node_modules", express.static("./node_modules"));
application.listen(3000, function () { return console.log("Rodando na porta 3000"); });
