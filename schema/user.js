import { mongoose } from 'mongoose';

const Users= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        unique: true,
        primaryKey: true
    },
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', Users);

export {User}