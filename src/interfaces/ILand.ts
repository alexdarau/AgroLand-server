import { ICoordinates } from './ICoordinates'
import { IOperation } from './IOperation'
import { INote } from './INotes'

export interface ILand {
    landName: string,
    points: Array<ICoordinates>,
    area: Number,
    operations: Array<IOperation>,
    notes: Array<INote>
    created_date: Date,
};