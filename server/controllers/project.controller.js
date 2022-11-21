const db = require("../models");
const Project = db.project;
const History = db.history;

const loggerFunction = require("../utils/loggerFunction");
const log4j = require("../config/configLog4js.js");
const util = require("../utils/Utils");
var moment = require('moment');
const { projectSchemaValidations } = require("../validations");

module.exports = {
  getListOfProjects: async (req, res) => {
    loggerFunction.loggerFunction(req, res);
    var userCondition = (req.role == "user") ? {
      members: req.userId
    } : {
      administrators: req.userId
    }

    try {
      const projects = await Project.find(userCondition).populate('administrators')
        .populate('members')
        .populate('tasks')
        .populate('history')
      
      if (!projects) {
        log4j.loggerinfo.info(404, "No projects foud");
        util.setError(404, {
          msg: "No projects found",
        });
        return util.send(res);
      }
      log4j.loggerinfo.info(200, "projects fetched");
      util.setSuccess(200, 'find and count projects list', projects);
      return util.send(res);
    } catch (error) {
      log4j.loggerinfo.info(500, `getListOfProjects : ${error.message}`);
      util.setError(500, "Cannot get data");
      return util.send(res);
    }
  },
  //
  createProject: async (req, res) => {
    const { error } = projectSchemaValidations(req.body);
    if (error) {
        log4j.loggererror.error(error.details[0].message);
        util.setError(400, error.details[0].message);
        return util.send(res);
    }

    try {
      const project = new Project({
        name: req.body.name,
        key: req.body.key,
        description: req.body.description,
        status: "new",
        members: req.body.members,
        administrators: req.body.administrators,
        createdAt: moment().format()
      });
      let created_project = await project.save();

      const history = new History({
        description: `create project`,
        user: req.userId,
        project: created_project._id,
        createdAt: moment().format(),
        key: created_project.key
      });
      let save_history = await history.save();

      let updated_project = await Project.findOneAndUpdate({ _id: created_project._id }, { history: save_history._id }, {
        new: true
      });

      log4j.loggerinfo.info(200,created_project ,"project created");
      util.setSuccess(201, "project created");
      return util.send(res);
    } catch (error) {
      log4j.loggerinfo.info(500, `createProject : ${error.message}`);
      util.setError(500, error.message);
      return util.send(res);
    }
  },
  // 
  getProjectByKey: async (req, res) => {
    loggerFunction.loggerFunction(req, res);
    var userCondition = (req.role == "user") ? {
      members: req.userId,
      key: req.params.key  
    } : {
      administrators: req.userId,
      key: req.params.key  
    }
    try {
      const project = await Project.findOne(userCondition).populate('administrators')
        .populate('members')
        .populate('tasks')
        .populate('history');;
      if (!project) {
        log4j.loggerinfo.info(404, "No projects foud");
        util.setError(404, {
          msg: "No projects found",
        });
        return util.send(res);
      }
      log4j.loggerinfo.info(200, "project fetched");
      util.setSuccess(200, project);
      return util.send(res);
    } catch (error) {
      log4j.loggerinfo.info(500, `getListOfProjects : ${err.message}`);
      util.setError(500, "Cannot get data");
      return util.send(res);
    }
  },

  updateProject: async (req, res) => {
    loggerFunction.loggerFunction(req, res);
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must provide a body to update",
      });
    }
    try {
      let updated_project = await Project.findOneAndUpdate({ key: req.params.key }, body, {
        new: true
      });
      const history = new History({
        description: `update project`,
        user: req.userId,
        project: updated_project._id,
        createdAt: moment().format()
      });
      let save_history = await history.save();
      log4j.loggerinfo.info(200, "project fetched");
      util.setSuccess(200, "project updated");
      return util.send(res);
    } catch (error) {
      log4j.loggerinfo.info(500, `update project : ${err.message}`);
      util.setError(500, "Project not updated");
      return util.send(res);
    }
  },
  // 
  closeProject: async (req, res) => {
    loggerFunction.loggerFunction(req, res);
    if (!req.params._id) {
      return res.status(400).json({
        success: false,
        error: "You must provide a project _id",
      });
    }
    try {
      let updatedProject = await Project.findOneAndUpdate({ _id: req.params._id }, { closedAt: moment().format() }, {
        new: true
      });
      if (!updatedProject) {
        log4j.loggerinfo.info(400, `close project : project not found`);
        util.setError(400, "Project not found");
        return util.send(res);
      }
      const history = new History({
        description: `close project`,
        user: req.userId,
        key: '1234',
        project: updatedProject._id,
        createdAt: moment().format()
      });
      let save_history = await history.save();
      log4j.loggerinfo.info(200, "project closed");
      util.setSuccess(200, "project closed");
      return util.send(res);
    } catch (error) {
      log4j.loggerinfo.info(500, `close project : ${error.message}`);
      util.setError(500, "Project not closed");
      return util.send(res);
    }
  }
};