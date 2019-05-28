import Environment from "../constants/Environment";
import {Sequelize} from "sequelize-typescript";
import Fs from "fs";

const DB_CONFIG: any = JSON.parse(Fs.readFileSync("./src/db/dbconfig.json").toString());

const DevConfig = {
    PORT: 3000,
    ENV: Environment.DEVELOPMENT,
    DB_CONFIG: DB_CONFIG['development']
};

export default DevConfig;
