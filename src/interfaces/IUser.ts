export interface IUser {
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String            
    },
    password: {
        type: String            
    },
    phone: {
        type: Number            
    },
    created_date: {
        type: Date
    }
}