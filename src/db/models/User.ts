import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt, HasMany,
    IsDate,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import Book from './Book';

@Table({tableName: 'user'})
class User extends Model<User> {

    @AutoIncrement
    @AllowNull(false)
    @PrimaryKey
    @Column
    id: number;

    @Column
    firstName: string;

    @Column
    lastName: string;

    @IsDate @CreatedAt @Column
    createdAt: Date;

    @IsDate @UpdatedAt @Column
    updatedAt: Date;

    @HasMany(() => Book)
    books: Book[];
}

export default User;
