import {
    AllowNull,
    AutoIncrement, BelongsToMany,
    Column,
    CreatedAt,
    IsDate,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import Book from './Book';
import BookGenre from './BookGenre';


@Table({tableName: 'genre'})
class Genre extends Model<Genre> {

    @AutoIncrement
    @AllowNull(false)
    @PrimaryKey
    @Column
    id: number;

    @Column
    genreName: string;

    @IsDate @CreatedAt @Column
    createdAt: Date;

    @IsDate @UpdatedAt @Column
    updatedAt: Date;

    @BelongsToMany(() => Book , () => BookGenre)
    books: Book[];
}

export default Genre;
