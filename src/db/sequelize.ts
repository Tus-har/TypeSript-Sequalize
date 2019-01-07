'use strict';
import {Sequelize} from 'sequelize-typescript';
import User from "./models/user";
import Config from "../config/Config";

const sequelize = new Sequelize(Config.DB_CONFIG);

export default sequelize;
