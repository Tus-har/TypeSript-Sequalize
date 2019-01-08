
import User from "./db/models/user";
import Faker from "faker";
import Book from "./db/models/book";
import Lodash from 'lodash';


const test = async () => {
    const users: User[] = [];
    for (let i = 0 ; i < 10 ; i++){
        let u = new User({firstName: Faker.name.firstName(), lastName: Faker.name.lastName(), email: Faker.internet.email()});
        await u.save();
        users.push(u);
    }

    for (let i = 0 ; i < 100 ; i++){
        let b = new Book({name: Faker.name.findName()});
        await b.save();
        let user: User = Lodash.sample(users);
        await user.$add('book', b);
    }

    const books: any = await Lodash.sample(users).$get('books');
    console.log(books.length);

    let userCount: number = await User.count({});
    let bookCount: number = await Book.count({});
    console.log(userCount +" "+bookCount);
};

test();

