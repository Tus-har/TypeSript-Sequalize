
import User from "./db/models/user";

const test = async () => {
    const user = new User({firstName: 'anas', lastName:'md', email: 'anas.ansal10@gmail.com'});
    await user.save();
    console.log(user);
};

test();

