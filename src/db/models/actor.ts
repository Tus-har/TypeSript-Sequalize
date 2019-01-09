import {
    BeforeBulkCreate,
    BeforeBulkUpdate,
    BeforeCreate,
    BeforeSave,
    BeforeUpdate,
    BelongsToMany,
    Column,
    Model,
    Scopes,
    Table
} from 'sequelize-typescript';
import Movie from './movie';
import MovieActor from './movieactor';

// export interface ActorAttributes {
//     firstName ? : string;
//     lastName ? : string;
//     birthday ? : string;
//     movies ? : string;
//
// }
//
// export interface ActorInstance {
//     id: number;
//     createdAt: Date;
//     updatedAt: Date;
//
//     firstName: string;
//     lastName: string;
//     birthday: string;
//     movies: [];
//
// }

@Scopes({
    movies:{
        include: [
            {
                model: () => Movie,
                through: {attributes:['movies']},
            },
        ],
    },
})

@Table({tableName: 'Actors'})
export default class Actor extends Model<Actor>{
    @Column
    public name: string;

    @BelongsToMany(() => Movie, () => MovieActor)
    public movies?: Movie[];

    @Column
    public createdAt: Date;

    @Column
    public updatedAt: Date;

    @BeforeCreate
    static setCreatedDate(instance: Actor){
        instance.createdAt = new Date();
        instance.updatedAt = new Date();
    }

    @BeforeBulkCreate
    static async setCreatedDateBulk(instance: Array<Actor>) {
        const len = instance.length;
        for(let i = 0; i < len; i++) {
            let createdAt = new Date();
            let updatedAt = new Date();
            instance[i].createdAt = createdAt;
            instance[i].updatedAt = updatedAt;
        }
    }

    @BeforeUpdate
    @BeforeBulkUpdate
    static setUpdatedDate(instance: Actor){
        instance.updatedAt = new Date();
    }

    @BeforeSave
    static setUpdatedAndCreated(ins: Actor){
        if (!ins.createdAt)
            ins.createdAt = new Date();
        ins.updatedAt = new Date();
    }

    static scope(...args: any[]): typeof Actor {
        args[0] = args[0] || 'defaultScope';
        return super.scope.call(this, ...args);
    }
}

// export = (sequelize: Sequelize, DataTypes: DataTypes) => {
//     var Actor = sequelize.define('Actor', {
//         firstName: DataTypes.STRING,
//         lastName: DataTypes.STRING,
//         birthday: DataTypes.STRING,
//         movies: DataTypes.STRING
//     });
//
//     Actor.associate = function(models) {
//         // associations can be defined here
//     };
//
//     return Actor;
// };