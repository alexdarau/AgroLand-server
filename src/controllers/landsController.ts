import * as mongoose from 'mongoose';
import Land from '../models/land';
import { ICoordinates } from '../interfaces/ICoordinates';
import { Request, Response } from 'express';

export class LandController {

    public async addLand(req: Request, res: Response) {
        const { landName, pointsReq } = req.body;
        const points = JSON.parse(pointsReq);
        const area = LandController.calculateArea(points)
        console.log("Area:", LandController.calculateArea(points))
        try {
            const response = await Land.create({
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
}