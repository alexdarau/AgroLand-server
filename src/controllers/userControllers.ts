import * as mongoose from 'mongoose';
import User from '../models/user';
import { Request, Response } from 'express';

export class UserController{
    
public addUser (req: Request, res: Response) {                
        let newUser = new User(req.body);
    
        newUser.save((err, user) => {
            if(err){
                res.send(err);
            }    
            res.json(user);
        });
    }

    // public getContacts (req: Request, res: Response) {           
    //     User.find({}, (err, contact) => {
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json(contact);
    //     });
    // }

    // public getContactWithID (req: Request, res: Response) {           
    //     User.findById(req.params.contactId, (err, contact) => {
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json(contact);
    //     });
    // }

    // public updateContact (req: Request, res: Response) {           
    //     Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json(contact);
    //     });
    // }

    // public deleteContact (req: Request, res: Response) {           
    //     Contact.remove({ _id: req.params.contactId }, (err) => {
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json({ message: 'Successfully deleted contact!'});
    //     });
    // }
}