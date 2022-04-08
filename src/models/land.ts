import * as mongoose from 'mongoose';



const Schema = mongoose.Schema;

export const LandSchema = new Schema({
    landName: {
        type: String,
        required: 'Enter a first name'
    },
    points:{

    },
    created_date: {
        type: Date,
        default: Date.now
    }
});