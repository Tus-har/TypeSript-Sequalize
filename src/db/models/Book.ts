import {
    AllowNull,
    AutoIncrement, BelongsTo, BelongsToMany,
    Column,
    CreatedAt, ForeignKey, HasMany,
    IsDate,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import BookGenre from './BookGenre';
import Genre from './Genre';
import User from './User';

@Table({tableName: 'book'})
class Book extends Model<Book> {

    @AutoIncrement
    @AllowNull(false)
    @PrimaryKey
    @Column
    id: number;

    @Column
    bookName: string;

    @IsDate @CreatedAt @Column
    createdAt: Date;

    @IsDate @UpdatedAt @Column
    updatedAt: Date;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User ;

    // @ForeignKey(() => Genre)
    // @Column
    // genreId: number;

    @BelongsToMany(() => Genre , () => BookGenre)
    genres: Genre[] ;

}

export default Book;
