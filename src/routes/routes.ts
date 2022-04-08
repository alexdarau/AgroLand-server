import { Request, Response } from "express";
import { UserController } from "../controllers/userControllers";
import { LandController } from "../controllers/landsController";

export class Routes {

    public userControllers: UserController = new UserController();
    public landController: LandController = new LandController();

    public routes(app): void {
        app.route('/add')
            .post(this.userControllers.addUser)

            app.route('/addLand')
            .post(this.landController.addLand);

    }
}