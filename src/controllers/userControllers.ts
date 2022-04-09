import * as mongoose from 'mongoose';
import User from '../models/user';
import { IUser } from '../interfaces/IUser'
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
const JWT_SECRET = "asfnajksnfkjasdnfkjsdnfkjsdnfknsdkjf"
export class UserController {

    public addUser(req: Request, res: Response) {
        let newUser = new User(req.body);

        newUser.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });

    }

    public async register(req, res) {
        const { username, password: plainTextPassword } = req.body;
        
        const password = await bcrypt.hash(plainTextPassword, 10)

        try {
            const response = await User.create({
                username,
                password
            })
            console.log("Response", JSON.stringify(response))
        } catch (err) {
            console.log("Error", err)
        }
        res.json("ok");
    }

    public async login(req, res) {

        const { username, password } = req.body;

        console.log(username, password)
        const user = await User.findOne({ username: username });
        console.log(user)
        if (!user) {
            return res.json({ status: "error", error: "User not found" })
        }

        if (await bcrypt.compare(password, user.password)) {

            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, JWT_SECRET)
            return res.json({ status: "ok", data: token })
        }


        res.json({ status: "ok", data: "ssss" })
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