import { UserController } from "../controllers/userControllers";

export class UserRoutes {

    public userControllers: UserController = new UserController();


    public routes(app): void {
        app.route('/api/change-password')
            .post(this.userControllers.changePassword);
        app.route('/api/register')
            .post(this.userControllers.register);
        app.route('/api/login')
            .post(this.userControllers.login);

    }
}