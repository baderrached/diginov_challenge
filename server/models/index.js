const config = require("../config/db.config");

const db = {};

db.user = require("../models/user.model");
db.project = require("../models/project.model");
db.task = require("../models/task.model");
db.history = require("../models/history.model");





module.exports = db;
