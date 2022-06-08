import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
import { UserRoutes } from "./routes/userRoutes";
import { LandRoutes } from "./routes/landRoutes";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL
console.log(DATABASE_URL)
class App {
    public app: express.Application;
    public userRoutes: UserRoutes = new UserRoutes();
    public landRoutes: LandRoutes = new LandRoutes();
    public mongoUrl: string = DATABASE_URL;  


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