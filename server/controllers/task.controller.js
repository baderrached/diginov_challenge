const db = require("../models");
const Task = db.task;
const Project = db.project;
const History = db.history;
const loggerFunction = require("../utils/loggerFunction");
const log4j = require("../config/configLog4js.js");
const util = require("../utils/Utils");
var moment = require('moment');
const { taskSchemaValidations } = require("../validations");

module.exports = {
  getTasksByProject: async (req, res) => {
    loggerFunction.loggerFunction(req, res);
    var userCondition = (req.role == "user") ? {
      members: req.userId,
     _id: req.params.projectId
    } : {
      administrators: req.userId,
     _id: req.params.projectId
    }
    const project_Permession =  await Project.findOne(userCondition).exec()
    console.log("🚀 ~ file: task.controller.js ~ line 23 ~ getTasksByProject: ~ project_Permession", project_Permession)
    
    if(!project_Permession){
      log4j.loggerinfo.info(403, `getTaskbyProject forbiden`);
      util.setError(403, "forbiden");
      return util.send(res);
    }
    try {
      const task = await Task.find({project: req.params.projectId}).populate("creator").populate("assigned").populate(({
        path: "history",
        populate: "user"
      }));
      if (!task) {
        log4j.loggerinfo.info(404, "No Task foud");
        util.setError(404, {
          msg: "No Task found",
        });
        return util.send(res);
      }
      log4j.loggerinfo.info(200, "Task fetched");
      util.setSuccess(200,'tasks list' ,task);
      return util.send(res);
    } catch (error) {
      log4j.loggerinfo.info(500, `getListOfTask : ${error.message}`);
      util.setError(500, "Cannot get data");
      return util.send(res);
    }
  },
  //
  createTask: async (req, res) => {
    const { error } = taskSchemaValidations(req.body);
    if (error) {
        log4j.loggererror.error(error.details[0].message);
        util.setError(400, error.details[0].message);
        return util.send(res);
    }

    try {
      const task = new Task({
        name: req.body.name,
        key: req.body.key,
        description: req.body.description,
        creator: req.userId,
        assigned: req.body.assignedId,
        project: req.body.project,
        status: 'New',
        createdAt: moment().format()
      });
      let created_task = await task.save();
      let updatedProject = await Project.findByIdAndUpdate(req.body.project, { $push: { tasks: created_task._id }});
      const history = new History({
        description: 'create Task',
        user: req.userId,
        task: created_task._id,
        key: created_task.key,
        createdAt: moment().format()
      });
      let save_history = await history.save();
      let updatedTasks = await Task.findByIdAndUpdate(created_task._id,{ $push: {history: save_history}})
      log4j.loggerinfo.info(200,updatedTasks, "task created");
      util.setSuccess(201,created_task, "task created");
      return util.send(res);
    } catch (error) {
      log4j.loggerinfo.info(500, `createtask : ${error.message}`);
      util.setError(500, "something went wrong");
      return util.send(res);
    }
  },
  // 
  updateTaskStatus: async (req, res) => {
    loggerFunction.loggerFunction(req, res);

    if (!req.params.taskId) {
      return res.status(400).json({
        success: false,
        error: "You must provide a task to update",
      });
    }

    try {
      let updatedTask = await Task.findByIdAndUpdate(req.params.taskId, 
      { $set: {status: req.body.status }}, { new: true });
      if (!updatedTask) {
        log4j.loggerinfo.info(400, `update task : task not found`);
        util.setError(400, "task not found");
        return util.send(res);
      }

      const history = new History({
        description: `update task status to '${req.body.status}'`,
        user: req.userId,
        task: updatedTask._id,
        key: updatedTask.key,
        createdAt: moment().format()
      });
      let save_history = await history.save();
      let updatedHistoryTask = await Task.findByIdAndUpdate(updatedTask._id,{ $push: {history: save_history}})

      log4j.loggerinfo.info(200,updatedTask, "task status updated");
      util.setSuccess(200, "task status updated");
      return util.send(res);
    } catch (error) {
      log4j.loggerinfo.info(500, `update task status : ${error.message}`);
      util.setError(500, "task status not updated");
      return util.send(res);
    }
  }
};