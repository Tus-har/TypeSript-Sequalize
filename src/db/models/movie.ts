import {
    BeforeBulkCreate,
    BeforeBulkUpdate,
    BeforeCreate,
    BeforeSave,
    BeforeUpdate,
    BelongsToMany,
    Column,
    Model, PrimaryKey,
    Scopes,
    Table,
} from 'sequelize-typescript';
import Actor from "./actor";
import MovieActor from "./movieactor";
import Genre from "./genre";
import MovieGenre from "./moviegenre";

// export interface MovieAttributes {
//     title ?: string;
//     duration ?: string;
//     rating ?: string;
//     year ?: string;
//     certificate ?: string;
//     cast ?: string;
//     genres ?: [];
//     createdAt ?: string;
//     updatedAt ?: string;
//
// }
//
// export interface MovieInstance {
//     id: number;
//     createdAt: Date;
//     updatedAt: Date;
//
//     title: string;
//     duration: string;
//     rating: string;
//     year: string;
//     certificate: string;
//     cast: [];
//     genres: [];
//
// }



// const MovieActor2 = sequelize.define('movieActor', {
//     role: DataType.STRING
// })

@Scopes({
    cast:{
        include: [
            {
                model: () => Actor,
                through: {attributes:[]},
            },
        ],
    },
    genres: {
        include: [
            {
                model: () => Genre,
                through: {attributes:[]}
            },
        ],
    },
    full: {
        include: [{
            model: () => Actor,
            through: {attributes: []},
        }, {
            model: () => Genre,
            through: {attributes: []},
        }],
    },
})

@Table({tableName: 'Movies'})
export default class Movie extends Model<Movie> {

    // @PrimaryKey
    // @Column
    // public id: number;

    @Column
    public title: string;

    @BelongsToMany(() => Actor, () => MovieActor)
    public cast?: Actor[];

    @BelongsToMany(() => Genre, () => MovieGenre)
    public genres?: Genre[]

    @Column
    public createdAt: Date;

    @Column
    public updatedAt: Date;

    @BeforeCreate
    static setCreatedDate(instance: Movie){
        instance.createdAt = new Date();
        instance.updatedAt = new Date();
    }

    @BeforeBulkCreate
    static async setCreatedDateBulk(instance: Array<Movie>){
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
    static setUpdatedDate(instance: Movie){
        instance.updatedAt = new Date();
    }

    @BeforeSave
    static setUpdatedAndCreated(ins: Movie){
        if (!ins.createdAt)
            ins.createdAt = new Date();
        ins.updatedAt = new Date();
    }

    // static create<T extends Model<T>>(this: (new () => T), values?: FilteredModelAttributes<T>, options: ICreateOptions = {}): Promise<T> {
    //     const include: any = [];
    //     if (values) {
    //         if (values.cast) include.push(Actor);
    //         if (values.genres) include.push(Genre);
    //     }
    //     options.include = options.include ? options.include.concat(include) : include;
    //
    //     return super.create.call(this, values, options);
    // }

    static scope(...args: any[]): typeof Movie {
        args[0] = args[0] || 'defaultScope';
        return super.scope.call(this, ...args);
    }
}

// export = (sequelize: Sequelize, DataTypes: DataTypes) => {
//     var Movie = sequelize.define('Movie', {
//         title: DataTypes.STRING,
//         duration: DataTypes.STRING,
//         rating: DataTypes.STRING,
//         year: DataTypes.STRING,
//         actors: DataTypes.STRING,
//         certificate: DataTypes.STRING,
//         cast: DataTypes.STRING,
//         genres: DataTypes.STRING,
//         createdAt: DataTypes.STRING,
//         updatedAt: DataTypes.STRING
//     });
//
//     Movie.associate = function(models) {
//         // associations can be defined here
//     };
//
//     return Movie;
// };

