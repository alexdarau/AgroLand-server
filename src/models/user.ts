import * as mongoose from 'mongoose';
import {IUser} from '../interfaces/IUser'
import { Model } from 'mongoose';

const Schema = mongoose.Schema;

type UserType = IUser & mongoose.Document;

const UserSchema = new Schema<UserType>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String            
    },
    password: {
        type: String,      
    },
    phone: {
        type: Number            
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const User: Model<UserType> = mongoose.model<UserType>('User', UserSchema, 'User');

export default User;
