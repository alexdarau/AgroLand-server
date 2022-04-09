import User from '../models/user';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
const JWT_SECRET = "asfnajksnfkjasdnfkjsdnfkjsdnfknsdkjf"
export class UserController {

    public async register(req, res) {

        const { username, lastName, email, phone, password: plainTextPassword, } = req.body;

        const password = await bcrypt.hash(plainTextPassword, 10)

        try {
            const response = await User.create({
                username,
                lastName,
                email,
                phone,
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

        const user = await User.findOne({ username: username });
        console.log(user)
        if (!user) {
            return res.json({ status: "error", error: "User not found" })
        }

        if (await bcrypt.compare(password, user.password)) {

            const token = jwt.sign({
                id: user._id,
                firstName: user.firstName
            }, JWT_SECRET)
            return res.json({ status: "ok", data: token })
        }


        res.json({ status: "ok", data: "ssss" })
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

            console.log("🚀 ~ file: userControllers.ts ~ line 66 ~ UserController ~ changePassword ~ user", user)
        }
        catch (error) {
            res.json({ status: 'error', error: "bad token" })
        }
        res.json({ status: 'ok' })
    }
}