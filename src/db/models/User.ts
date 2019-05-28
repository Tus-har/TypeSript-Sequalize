import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt,
    IsDate,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from 'sequelize-typescript';

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
}

export default User;
