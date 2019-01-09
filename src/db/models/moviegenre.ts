import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import Movie from './movie';
import Genre from './genre';

// export interface MovieGenreAttributes {
//     genreId ? : string;
//     movieId ? : string;
//
// }
//
// export interface MovieGenreInstance {
//     id: number;
//     createdAt: Date;
//     updatedAt: Date;
//
//     genreId: string;
//     movieId: string;
//
// }

@Table({tableName: 'MovieGenre'})
export default class MovieGenre extends Model<MovieGenre>{
    @ForeignKey(() => Movie)
    @Column
    public movieId: number;

    @ForeignKey(() => Genre)
    @Column
    public genreId: number;
}

// export = (sequelize: Sequelize, DataTypes: DataTypes) => {
//     var MovieGenre = sequelize.define('MovieGenre', {
//         genreId: DataTypes.STRING,
//         movieId: DataTypes.STRING
//     });
//
//     MovieGenre.associate = function(models) {
//         // associations can be defined here
//     };
//
//     return MovieGenre;
// };
