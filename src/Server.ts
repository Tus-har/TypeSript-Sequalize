import {Model} from 'sequelize';
import Book from './db/models/Book';
import BookGenre from './db/models/BookGenre';
import Genre from './db/models/Genre';
import User from './db/models/User';
import sequelize from './db/sequelize';

const test = async () => {
    sequelize.addModels([User , Book , Genre , BookGenre]) ;
    // const user: User = new User({firstName: 'Hello', lastName: 'World'});
    // user.save().then((u) => {
    //     console.log(u);
    //     const book: Book = new Book({bookName: 'RD'});
    //     book.save().then(() => {
    //         user.$add('books', [book]);
    //         console.log(user.books);
    //     });
    // const users: User[] = [] ;
    // for (let i = 1 ; i <= 10 ; i++ ) {
    //     const temp: User = new User( {firstName: 'LoopUser' + i, lastName: 'Han'}) ;
    //     users.push(temp);
    //     await temp.save() ;
    // }
    //
    // const books: Book[] = [] ;
    // for (let i = 1 ; i <= 30 ; i++ ) {
    //     const temp: Book = new Book( {bookName: 'LoopBook' + i}) ;
    //     books.push(temp);
    //     temp.save().then(() => {
    //         const random = Math.floor(Math.random() * 9) ; // to select random user from users[] ;
    //         users[random].$add('books', [temp]);
    //     }) ;
    // }
    // const genres: Genre[] = [] ;
    // for (let i = 1 ; i <= 10 ; i++ ) {
    //     const temp: Genre = new Genre( {genreName: 'LoopGenre' + i}) ;
    //     genres.push(temp);
    //     temp.save().then( () => {
    //         for (let j = 0; j < Math.floor(Math.random() * 5) ; j++ ) {
    //             const random = Math.floor(Math.random() * 29) ;
    //             books[random].$add('genres', [temp]);
    //         }
    //     }) ;
    // }
    // User.findOne({where: {firstName: 'LoopUser2'}}).then((user) => {
    //     user.$get('books').then((a: []) => {
    //         a.forEach((ele: Book) => {
    //             console.log(ele.bookName);
    //         });
    //     });
    // });
    // Book.findOne({where: {bookName: 'LoopBook19'}}).then((book) => {
    //     book.$get('genres').then((a: []) => {
    //         a.forEach((ele: Genre) => {
    //             console.log(ele.genreName);
    //         });
    //     });
    // });
    // const user: User =  await User.findOne({where: {firstName: 'LoopUser2'}})
    //
    // user.save();
    //     .then((user) => {
    //     user.$get('books').then((a: Book[]) => {
    //         a.forEach((ele: Book) => {
    //             ele.$get('genres').then((b: []) => {
    //                 b.forEach((el: Genre) => {
    //                     console.log('Genre for ' + ele.bookName + ' : ' + el.genreName);
    //                 });
    //             });
    //         });
    //     });
    // });
    const user = await User.findOne({where: { firstName: 'LoopUser7'}, include: [{model: Book , include: [Genre]}]});
    for (let i = 0 ; i < user.books.length; i++) {
        for (let j = 0 ; j < user.books[i].genres.length ; j++) {
            console.log(user.books[i].bookName + ' : ' + user.books[i].genres[j].genreName);
        }
    }
};

test();
