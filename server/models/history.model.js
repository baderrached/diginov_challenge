const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const History = new Schema({
    description: {
        type: String,
        required: true
    },
    key: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true
    },
    user: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

module.exports = mongoose.model("history", History);