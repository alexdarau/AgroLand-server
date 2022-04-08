import { Request, Response } from "express";
import { UserController } from "../controllers/userControllers";

export class Routes {

    public userControllers: UserController = new UserController();

    public routes(app): void {
        app.route('/add')
            .post(this.userControllers.addUser)
    }
}