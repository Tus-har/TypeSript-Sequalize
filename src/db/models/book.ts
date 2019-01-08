import {
    BeforeBulkCreate, BeforeBulkUpdate,
    BeforeCreate, BeforeSave,
    BeforeUpdate,
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table
} from "sequelize-typescript";
import User from "./user";

export interface BooksAttributes {
    name?: string;

}

export interface BooksInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    name: string;

}

@Table({tableName: 'Book'})
export default class Book extends Model<Book> {

    @Column
    name: string;

    @ForeignKey(() => User)
    @Column
    authorId: number;

    @BelongsTo(() => User)
    get author(): Promise<User> {
        // @ts-ignore
        return this.$get('author');
    }

    @Column
    public createdAt: Date;

    @Column
    public updatedAt: Date;

    @BeforeCreate
    @BeforeBulkCreate
    static setCreatedDate(instance: Book){
        instance.createdAt = new Date();
        instance.updatedAt = new Date();
    }

    @BeforeUpdate
    @BeforeBulkUpdate
    static setUpdatedDate(instance: Book){
        instance.updatedAt = new Date();
    }

    @BeforeSave
    static setUpdatedAndCreated(ins: Book){
        if (!ins.createdAt)
            ins.createdAt = new Date();
        ins.updatedAt = new Date();
    }
}
