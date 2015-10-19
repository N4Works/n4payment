"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import {Router as UserRouter} from "./routes/user_route";
import {Router as PagSeguroRouter} from "./routes/pagseguro_route";

mongoose.connect("mongodb://localhost/n4-payment", function (error) {
    if (error) {
        console.log("Erro ao conectar no mongodb: " + error);
    }
});

var application: express.Application = express();
application.use("/api/users", UserRouter(application));
application.use("/api/pagseguro", PagSeguroRouter(application));

application.use("/", express.static("./public"));
application.use("/node_modules", express.static("./node_modules"));

application.listen(3000, () => console.log("Rodando na porta 3000"));
