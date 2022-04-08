import * as mongoose from 'mongoose';
import Land from '../models/land';
import { Request, Response } from 'express';

export class LandController{
    
    public addLand (req: Request, res: Response) {                
            let newLand = new Land(req.body);
        
            newLand.save((err, user) => {
                if(err){
                    res.send(err);
                }    
                res.json(user);
            });
        }
}