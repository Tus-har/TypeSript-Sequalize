import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import Movie from './movie';
import Actor from './actor';

// export interface MovieActorAttributes {
//     actorId ? : string;
//     movieId ? : string;
//
// }
//
// export interface MovieActorInstance {
//     id: number;
//     createdAt: Date;
//     updatedAt: Date;
//
//     actorId: string;
//     movieId: string;
//
// }

@Table({tableName: 'MovieActor'})
export default class MovieActor extends Model<MovieActor>{
    @ForeignKey(() => Movie)
    @Column
    public movieId: number;

    @ForeignKey(() => Actor)
    @Column
    public actorId: number;
}

// export = (sequelize: Sequelize, DataTypes: DataTypes) => {
//     var MovieActor = sequelize.define('MovieActor', {
//         actorId: DataTypes.STRING,
//         movieId: DataTypes.STRING
//     });
//
//     MovieActor.associate = function(models) {
//         // associations can be defined here
//     };
//
//     return MovieActor;
// };
