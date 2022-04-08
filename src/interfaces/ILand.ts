import { ICoordinates } from './ICoordinates'

export interface ILand {
    landName: String,
    points: Array<ICoordinates>,
    created_date: Date,
};