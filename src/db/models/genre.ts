import {
    BeforeBulkCreate,
    BeforeBulkUpdate,
    BeforeCreate,
    BeforeSave,
    BeforeUpdate, BelongsToMany,
    Column,
    Model,
    Scopes,
    Table
} from 'sequelize-typescript';
import Movie from "./movie";
import MovieGenre from "./moviegenre";

// export interface GenreAttributes {
//     name ? : string;
//     movies ? : string;
//
// }
//
// export interface GenreInstance {
//     id: number;
//     createdAt: Date;
//     updatedAt: Date;
//
//     name: string;
//     movies: [];
//
// }

@Scopes({
    movies: {
        include: [
            {
                model: () => Movie,
                through: {attributes: []},
            },
        ],
    },
})

@Table({tableName: 'Genres'})
export default class Genre extends Model<Genre>{
    @Column
    public name: string;

    @BelongsToMany(() => Movie, () => MovieGenre)
    public movies?: Movie[];

    @Column
    public createdAt: Date;

    @Column
    public updatedAt: Date;

    @BeforeBulkCreate
    static setCreatedDateBulk(instance){
        const len = instance.length
        for(let i=0; i<len; i++){
            let createdAt = new Date()
            let updatedAt = new Date()
            instance[i].createdAt = createdAt;
            instance[i].updatedAt = updatedAt;
        }
    }

    @BeforeCreate
    static setCreatedDate(instance: Genre){
        instance.createdAt = new Date();
        instance.updatedAt = new Date();
    }

    @BeforeUpdate
    @BeforeBulkUpdate
    static setUpdatedDate(instance: Genre){
        instance.updatedAt = new Date();
    }

    @BeforeSave
    static setUpdatedAndCreated(ins: Genre){
        if (!ins.createdAt)
            ins.createdAt = new Date();
        ins.updatedAt = new Date();
    }

    static scope(...args: any[]): typeof Genre {
        args[0] = args[0] || 'defaultScope';
        return super.scope.call(this, ...args);
    }
}

// export = (sequelize: Sequelize, DataTypes: DataTypes) => {
//     var Genre = sequelize.define('Genre', {
//         name: DataTypes.STRING,
//         movies: DataTypes.STRING
//     });
//
//     Genre.associate = function(models) {
//         // associations can be defined here
//     };
//
//     return Genre;
// };

