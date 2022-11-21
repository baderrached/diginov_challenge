const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Project = new Schema({
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
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    closedAt: {
        type: Date,
        default: null
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    administrators: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'tasks' }],
    history: [{ type: Schema.Types.ObjectId, ref: 'history' }],

});

module.exports = mongoose.model("projects", Project);