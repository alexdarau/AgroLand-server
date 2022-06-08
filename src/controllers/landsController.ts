import Land from '../models/land';
import User from '../models/user';
import { Request, Response } from 'express';
const ObjectId = require('mongodb').ObjectId;

export class LandController {

    public async addLand(req: Request, res: Response) {
        const { landName, pointsReq, username } = req.body;
        console.log("land name: " + landName);
        console.log("pointsReq: " + JSON.stringify(pointsReq));
        const points = JSON.parse(pointsReq);
        console.log("🚀 ~ file: landsController.ts ~ line 12 ~ LandController ~ addLand ~ points", JSON.stringify(points))
        const area = LandController.calculateArea(points)

        const user = await User.findOne({ username });
        if (user) {
            const userId = user._id;

            //console.log("Area:", LandController.calculateArea(points))
            try {
                const response = await Land.create({
                    userId,
                    landName,
                    points,
                    area
                });
                res.json(response);
                //console.log("Response", JSON.stringify(response))
            } catch (err) {
                console.log("Error", err)
            }
        }
        else {
            res.status(401).json("Unauthorized access");
        }
    }

    private static calculateArea(coordinates: any) {
        let area: number = 0;

        if (coordinates.length > 2) {
            let prev = coordinates[coordinates.length - 1];
            let prevTanLat = Math.tan((Math.PI / 2 - LandController.convertToRadian(prev.latitude)) / 2);
            let prevLng = LandController.convertToRadian(prev.longitude);
            coordinates.forEach(point => {
                let tanLat = Math.tan((Math.PI / 2 - LandController.convertToRadian(point.latitude)) / 2);
                let lng = LandController.convertToRadian(point.longitude);
                area += LandController.polarTriangleArea(tanLat, lng, prevTanLat, prevLng);
                prevTanLat = tanLat;
                prevLng = lng;
            })

            area = area * 6366993 * 6366993;

        }

        return Math.abs(area);
    }

    private static convertToRadian(input: number) {
        return input * Math.PI / 180;
    }

    private static polarTriangleArea(tan1: number, lng1: number, tan2: number, lng2: number) {
        let deltaLng = lng1 - lng2;
        let t = tan1 * tan2;
        return 2 * Math.atan2(t * Math.sin(deltaLng), 1 + t * Math.cos(deltaLng));
    }



    public async addOperation(req: Request, res: Response) {

        const { opName, landName, username } = req.body;
        const operation = {
            opName,
            created_date: new Date()
        }
        const user = await User.findOne({ username });
        const userId = user._id;


        try {
            const land = await Land.updateOne(
                { userId: userId, landName: landName },
                { $push: { operations: operation } }
            );
            res.json(land);
            console.log("Response", JSON.stringify(land))
        } catch (err) {
            console.log("Error", err)
        }
    }

    public async getOperations(req: Request, res: Response) {

        const { landName, username } = req.query;
        const user = await User.findOne({ username });
        const userId = user._id;


        try {
            const land = await Land.findOne({ userId: userId, landName: landName })
            if (land.operations) {
                res.json(land.operations);
                console.log("Response", JSON.stringify(land))
            }
            else {
                return res.status(200).json({
                    operations: []
                })
            }
        } catch (err) {
            console.log("Error", err)
        }
    }

    public async addNote(req: Request, res: Response) {
        const { note, landName, username } = req.body;
        const landNote = {
            note,
            created_date: new Date()
        }
        const user = await User.findOne({ username });
        if (user) {
            const userId = user._id;

            try {
                const land = await Land.updateOne(
                    { userId: userId, landName: landName },
                    { $push: { notes: landNote } }
                );
                res.json(land);
                console.log("Response", JSON.stringify(land))
            } catch (err) {
                console.log("Error", err)
            }
        }
        else {
            return res.status(400).json({ message: "user not found" });
        }
    }

    public async getNotes(req: Request, res: Response) {

        const { landName, username } = req.query;
        const user = await User.findOne({ username });
        const userId = user._id;

        try {
            const land = await Land.findOne({ userId: userId, landName: landName })
            console.log("🚀 ~ file: landsController.ts ~ line 147 ~ LandController ~ getNotes ~ land", land)
            if (land.notes) {
                res.json(land.notes);
                console.log("Response", JSON.stringify(land))
            }
            else {
                return res.status(200).json({
                    notes: []
                })
            }
        } catch (err) {
            console.log("Error", err)
        }
    }

    public async getLands(req: Request, res: Response) {

        const { username } = req.query;
        const user = await User.findOne({ username });
        if (user) {
            const userId = user._id;


            try {
                const lands = await Land.find({ userId: userId })
                res.json(lands);
                console.log("Response", JSON.stringify(lands))
            } catch (err) {
                console.log("Error", err)
            }
        }
        else {
            return res.status(400).json({ message: "user not found" });
        }
    }

    public async getLand(req: Request, res: Response) {

        const { landName, username } = req.query;
        const user = await User.findOne({ username });
        if (user) {
            const userId = user._id;


            try {
                const land = await Land.findOne({ userId: userId, landName: landName })
                console.log("🚀 ~ file: landsController.ts ~ line 187 ~ LandController ~ getLand ~ land", land)
                res.json(land);
                console.log("Response", JSON.stringify(land))
            } catch (err) {
                console.log("Error", err)
            }
        }

        else {
            return res.status(400).json({ message: "user not found" });
        }
    }

    public async deleteLand(req: Request, res: Response) {

        const { landId } = req.query;
        const searchId = new ObjectId(landId)
        const land = await Land.findOneAndDelete({ _id: searchId });
        if (land) {
            try {
                res.status(200).json("Land successfully deleted");
            } catch (err) {
                console.log("Error", err)
            }
        }

        else {
            return res.status(400).json({ message: "Land not found" });
        }
    }

    public async deleteOperation(req: Request, res: Response) {

        const { opName, userId, landName } = req.query;
        const land = await Land.updateOne(
            { userId: userId, landName: landName },
            { $pull: { operations: { opName: opName } } }
        );
        console.log("🚀 ~ file: landsController.ts ~ line 257 ~ LandController ~ deleteNote ~ land", land)
        if (land) {
            try {

                res.status(200).json("Operation successfully deleted");
            } catch (err) {
                console.log("Error", err)
            }
        }
        else {
            return res.status(400).json({ message: "Land not found" });
        }
    }

    public async deleteNote(req: Request, res: Response) {

        const { note, userId, landName } = req.query;
        const land = await Land.updateOne(
            { userId: userId, landName: landName },
            { $pull: { note: note } }
        );
        if (land) {
            try {

                res.status(200).json("Operation successfully deleted");
            } catch (err) {
                console.log("Error", err)
            }
        }
        else {
            return res.status(400).json({ message: "Land not found" });
        }
    }
}