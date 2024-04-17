import { mongoose } from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/,
        unique: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

const Employees = mongoose.model('Employees', EmployeeSchema);
export { Employees };
