import Config from "./config/Config";
import app from "./ExpressApp";

const PORT = Config.PORT;

app.listen(PORT, () => {
    console.log(Config.ENV);
    console.log('Express server listening on port ' + PORT);
});



