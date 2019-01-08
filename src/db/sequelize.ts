'use strict';
import {Sequelize} from 'sequelize-typescript';
import Config from "../config/Config";
import User from "./models/user";

const sequelize = new Sequelize(Config.DB_CONFIG);

export default sequelize;
