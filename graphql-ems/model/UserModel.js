import mongoose from 'mongoose';
var schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dateOfJoining: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        enum: ["Employee", "Manager", "Director", "VP"],
        required: true
    },
    department: {
        type: String,
        enum: ["IT", "Marketing", "HR", "Engineering"],
        required: true
    },
    employeeType: {
        type: String,
        enum: ["FullTime", "PartTime", "Contract", "Seasonal"],
        required: true
    },
    currentStatus: {
        type: Boolean,
        required: true,
        default: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
});
var UserModel = new mongoose.model('UserModel', schema);
export {UserModel};