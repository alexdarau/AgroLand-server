import { LandController } from "../controllers/landsController";

export class LandRoutes {

    public landController: LandController = new LandController();


    public routes(app): void {
        app.route('/api/land')
            .post(this.landController.addLand);
    }
}
