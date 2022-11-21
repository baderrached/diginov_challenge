
const express = require("express");
const { getListOfProjects, createProject, getProjectByKey, updateProject, closeProject } = require('../controllers/project.controller');
const verifyRole = require("../middeleware/VerifyRole");
const verifyToken = require("../middeleware/VerifyToken");
const router = express.Router();

router.get('/projects', [verifyToken ] , getListOfProjects)
router.get('/project/:key',  [verifyToken ] , getProjectByKey)
router.get('/project/close/:_id',  [verifyToken , verifyRole] , closeProject)
router.post('/project',  [verifyToken , verifyRole] , createProject)
router.put('/project',  [verifyToken , verifyRole] , updateProject)


module.exports = router;