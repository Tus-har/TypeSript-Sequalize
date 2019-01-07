
import {
    BeforeBulkCreate,
    BeforeBulkUpdate,
    BeforeCreate, BeforeSave,
    BeforeUpdate,
    Column,
    Model,
    Table
} from "sequelize-typescript";

import sequelize from "../sequelize";

// export interface UserAttributes {
//     firstName ? : string;
//     lastName ? : string;
//     email ? : string;
//
// }
//
// export interface UserInstance {
//     id: number;
//     createdAt: Date;
//     updatedAt: Date;
//
//     firstName: string;
//     lastName: string;
//     email: string;
//
// }

@Table({tableName: "Users"})
export default class User extends Model<User> {

    @Column
    public firstName: string;

    @Column
    public lastName: string;

    @Column
    public email: string;

    @Column
    public createdAt: Date;

    @Column
    public updatedAt: Date;

    @BeforeCreate
    @BeforeBulkCreate
    static setCreatedDate(instance: User){
        instance.createdAt = new Date();
        instance.updatedAt = new Date();
    }

    @BeforeUpdate
    @BeforeBulkUpdate
    static setUpdatedDate(instance: User){
        instance.updatedAt = new Date();
    }

    @BeforeSave
    static setUpdatedAndCreated(ins: User){
        if (!ins.createdAt)
            ins.createdAt = new Date();
        ins.updatedAt = new Date();
    }

}

sequelize.addModels([User]);
