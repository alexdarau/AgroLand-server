import * as mongoose from 'mongoose';
import Land from '../models/land';
import { Request, Response } from 'express';

export class LandController {

    public async addLand(req: Request, res: Response) {
        const { landName, points } = req.body;
        console.log("🚀 ~ file: landsController.ts ~ line 9 ~ LandController ~ addLand ~ points", points)
        console.log("🚀 ~ file: landsController.ts ~ line 9 ~ LandController ~ addLand ~ landName", landName)

        try {
            const response = await Land.create({
                landName,
                points
            });
            res.json(response);
            console.log("Response", JSON.stringify(response))
        } catch (err) {
            console.log("Error", err)
        }
    }
}