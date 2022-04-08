import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import {ILand} from '../interfaces/ILand'


const Schema = mongoose.Schema;
type LandType = ILand & mongoose.Document;

const LandSchema = new Schema({
    landName: {
        type: String,
        required: 'Enter the field name'
    },
    points:{
        type : Array, "default" : [] 
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Land: Model<ILand> = mongoose.model<LandType>('Land', LandSchema);

export default Land;