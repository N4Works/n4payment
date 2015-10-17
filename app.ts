"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import * as userRouter from "./routes/user_route";
import * as pagseguroRouter from "./routes/pagseguro_route";

mongoose.connect("mongodb://localhost/n4-payment", function (error) {
    if (error) {
        console.log("Erro ao conectar no mongodb: " + error);
    }
});

var application: express.Application = express();
application.use("/api/users", userRouter.Router(application));

application.use("/", express.static("./public"));
application.use("/node_modules", express.static("./node_modules"));

application.listen(3000, () => console.log("Rodando na porta 3000"));
