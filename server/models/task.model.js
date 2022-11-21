const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = require("../models");

const Task = new Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    project: { type: Schema.Types.ObjectId, ref: 'project' },
    creator: [{ type: Schema.Types.ObjectId, ref: 'users' , required: true }],
    assigned: [{ type: Schema.Types.ObjectId, ref: 'users' , required:true }],
    history: [{ type: Schema.Types.ObjectId, ref: 'history' }],
    status: {
        type: String,
        required: true,
        enum: ['New', 'Active' , 'Done'] 
    },
    createdAt: {
        type: Date,
        required: true
    },
    completedAt: {
        type: Date
    },
});

module.exports = mongoose.model("tasks", Task);