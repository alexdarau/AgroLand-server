import { ICoordinates } from './ICoordinates'

export interface ILand {
    landName: string,
    points: Array<ICoordinates>,
    area: Number,
    created_date: Date,
};