import Land from '../models/land';
import User from '../models/user';
import { Request, Response } from 'express';

export class LandController {

    public async addLand(req: Request, res: Response) {
        const { landName, pointsReq, username } = req.body;
        const points = JSON.parse(pointsReq);
        const area = LandController.calculateArea(points)

        const user = await User.findOne({ username });
        if (user) {
            const userId = user._id;

            console.log("Area:", LandController.calculateArea(points))
            try {
                const response = await Land.create({
                    userId,
                    landName,
                    points,
                    area
                });
                res.json(response);
                console.log("Response", JSON.stringify(response))
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
            res.json(land.operations);
            console.log("Response", JSON.stringify(land))
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
        const userId = user._id;

        try {
            const land = await Land.updateOne(
                { userId: userId, landName: landName},
                { $push: { notes: landNote } }
            );
            res.json(land);
            console.log("Response", JSON.stringify(land))
        } catch (err) {
            console.log("Error", err)
        }
    }

    public async getNotes(req: Request, res: Response) {

        const { landName, username } = req.query; 
        const user = await User.findOne({ username });
        const userId = user._id;


        try {
            const land = await Land.findOne({ userId: userId, landName: landName })
            res.json(land.notes);
            console.log("Response", JSON.stringify(land))
        } catch (err) {
            console.log("Error", err)
        }
    }

}