// import User from "./db/models/user";
import User from './db/models/User';
import sequelize from './db/sequelize';

const test = async () => {
    sequelize.addModels([User]);

    const user: User = new User({firstName: 'Hello', lastName: 'World'});
    user.save().then((u) => {
        console.log(u);
    });
};

test();
