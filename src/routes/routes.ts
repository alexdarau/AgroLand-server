import { Request, Response } from "express";
import { UserController } from "../controllers/userControllers";
import { LandController } from "../controllers/landsController";

export class Routes {

    private NAMESPACES = "User";

    public userControllers: UserController = new UserController();
    public landController: LandController = new LandController();

    public routes(app): void {
        app.route('/add')
            .post(this.userControllers.addUser)

        app.route('/addLand')
            .post(this.landController.addLand);
        app.route('/api/register')
            .post(this.userControllers.register);
        app.route('/api/login')
            .post(this.userControllers.login);

    }

    public validationToken = (req: Request, res: Response) => {
    }

    public register = (req: Request, res: Response) => {

    }

    public login = (req: Request, res: Response) => {

    }

    public getAllUsers = (req: Request, res: Response) => {

    }
}