import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { ILand } from '../interfaces/ILand'


const Schema = mongoose.Schema;
type LandType = ILand & mongoose.Document;

const LandSchema = new Schema({
    landName: {
        type: String,
    },
    points:{
        type: [],
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Land: Model<LandType> = mongoose.model<LandType>('Land', LandSchema, 'Land');

export default Land;