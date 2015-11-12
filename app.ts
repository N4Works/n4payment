"use strict";

import express = require("express");
import mongoose = require("mongoose");
import cookieParser = require("cookie-parser");
import {Router as UserRouter} from "./routes/user_route";
import {Router as SenderRouter} from "./routes/sender_route";
import {Router as CheckoutRouter} from "./routes/checkout_route";
import {Router as PagSeguroRouter} from "./routes/pagseguro_route";
import {Router as LoginRouter} from "./routes/login_route";
import login from "./middlewares/login_middleware";

var application: express.Application = express();

mongoose.connect(`mongodb://localhost/n4-payment`, (error: any) => {
    if (error) {
        return console.log(`Erro ao conectar no mongodb: ${error}`);
    }
});

application.use(cookieParser());

application.use("/api/login", LoginRouter(application));
application.use("/api/users", UserRouter(application));
application.use("/api/senders", login, SenderRouter(application));
application.use("/api/checkouts", login, CheckoutRouter(application));
// Login controlado por método, pois existe um acesso da API do PagSeguro.
application.use("/api/pagseguro", PagSeguroRouter(application));

application.use("/", express.static("./public"));
application.use("/node_modules", express.static("./node_modules"));

application.listen(3000, () => console.log("Rodando na porta 3000"));
