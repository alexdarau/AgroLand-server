import { ICoordinates } from './ICoordinates'
import { IOperation } from './IOperation'
import { INote } from './INotes'
import { ObjectId } from 'mongoose';

export interface ILand {
    username: ObjectId,
    landName: string,
    points: Array<ICoordinates>,
    area: Number,
    operations: Array<IOperation>,
    notes: Array<INote>
    created_date: Date,
};