import {Get, JsonController} from "routing-controllers";

@JsonController("/api/v1/users")
class UserController {

    @Get("/")
    getAll() {
        return {users: "Hello"}
    }
}

export default UserController;