import Environment from "../constants/Environment";
import {Sequelize} from "sequelize-typescript";

const DevConfig = {
    PORT: 3000,
    ENV: Environment.DEVELOPMENT,
    DB_CONFIG: {
        dialect: 'postgres',
        operatorsAliases: Sequelize.Op as any,
        database: 'ts',
        username: 'kush',
        password: null,
    }
};

export default DevConfig;