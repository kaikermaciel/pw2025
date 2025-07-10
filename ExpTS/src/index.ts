import express from "express";
import dotenv from "dotenv";
import {v4 as uuidv4} from "uuid";
import session from "express-session";

import { engine } from "express-handlebars";

import validateEnv from "./utils/validateEnv";
import logger from "./middlewares/logger";
import router from "./router/router";
import cookieParser from "cookie-parser"
import { checkAuth } from "./middlewares/checkAuth";

declare module "express-session" {
    export interface SessionData {
        logado: boolean;
    }
}


const app = express();
dotenv.config();
validateEnv();

const PORT = process.env.PORT ?? 6688;



app.engine("handlebars", engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(logger("simple"));

app.use("/css", express.static(`${process.cwd()}/public/css/`));
app.use("/js", express.static(`${process.cwd()}/public/js/`));
app.use("/img", express.static(`${process.cwd()}/public/img/`));


app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(session({
    genid: ()=> uuidv4(),
    secret: process.env.SECRET_SESSION !,
    resave: true,
    cookie: {},
    saveUninitialized: true,
}))

app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});