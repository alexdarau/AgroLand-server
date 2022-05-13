import User from '../models/user';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
const JWT_SECRET = "asfnajksnfkjasdnfkjsdnfkjsdnfknsdkjf"
export class UserController {

    public async register(req, res) {

        const { username, firstName, lastName, email, phone, password: plainTextPassword, } = req.body;

        const password = await bcrypt.hash(plainTextPassword, 10)

        const userReq = await User.findOne({ email });

        if (!userReq) {
            try {
                const response = await User.create({
                    username,
                    firstName,
                    lastName,
                    email,
                    phone,
                    password
                })
                return res.status(200).json({
                    message: "User created successfully!",
                    user: response
                })
            } catch (err) {
                console.error("Error", err)
                return res.status(401).json({
                    message: "User not created!"
                })
            }
        }
        else {
            res.status(401).json({
                message: "User already exists!",
            });
        }
    }

    public async login(req, res) {

        const { username, password } = req.body;

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.json({ status: "error", error: "User not found" })
        }

        if (await bcrypt.compare(password, user.password)) {

            const token = jwt.sign({
                id: user._id,
                firstName: user.firstName
            }, JWT_SECRET)
            return res.json({ status: "User authenticated successfully", data: token })
        }
        else{
            return res.status(401).json({
                message: "Invalid credentials!"
            })
        }
    }

    public async changePassword(req: Request, res: Response) {
        const { token, newPassword: plainTextPassword } = req.body
        try {

            const user: any = jwt.verify(token, JWT_SECRET)

            const _id = user.id

            const password = await bcrypt.hash(plainTextPassword, 10)
            await User.updateOne(
                { _id },
                {
                    $set: { password }
                }
            )
        }
        catch (error) {
            res.json({ status: 'error', error: "bad token" })
        }
        return res.status(200).json({
            message: "Password change successful!"
        })
    }
}