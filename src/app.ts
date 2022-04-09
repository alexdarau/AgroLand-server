import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { UserRoutes } from "./routes/userRoutes";
import { LandRoutes } from "./routes/landRoutes";


class App {

    public app: express.Application;
    public userRoutes: UserRoutes = new UserRoutes();
    public landRoutes: LandRoutes = new LandRoutes();
    public mongoUrl: string = 'mongodb://127.0.0.1:27017/test';  

    constructor() {
        this.app = express();
        this.config();     
        this.userRoutes.routes(this.app);   
        this.landRoutes.routes(this.app);   
        this.mongoSetup();
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void{
        (mongoose as any).Promise = global.Promise;
        mongoose.connect(this.mongoUrl);    
    }

}

export default new App().app;