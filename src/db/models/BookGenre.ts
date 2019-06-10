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
import Book from './Book';
import Genre from './Genre';

@Table({tableName: 'bookgenre'})
class BookGenre extends Model<BookGenre> {

    @AutoIncrement
    @AllowNull(false)
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => Book)
    @Column
    bookId: number;

    @ForeignKey(() => Genre)
    @Column
    genreId: number;

    @IsDate @CreatedAt @Column
    createdAt: Date;

    @IsDate @UpdatedAt @Column
    updatedAt: Date;
}

export default BookGenre;
