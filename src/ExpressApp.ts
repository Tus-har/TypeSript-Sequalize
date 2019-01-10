import express from "express";
import bodyParser from "body-parser";
import "reflect-metadata";
import {useExpressServer} from "routing-controllers";
import UserController from "./controllers/api/v1/UserController";

let app = express(); // your created express server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
useExpressServer(app, {
    controllers: [UserController]
});
app.listen(3000); // run your express server
