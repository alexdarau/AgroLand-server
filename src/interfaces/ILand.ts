import { ICoordinates } from './ICoordinates'

export interface ILand {
    landName: string,
    points: Array<ICoordinates>,
    created_date: Date,
};