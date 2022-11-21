const express = require("express");
const { createTask, getTasksByProject, updateTaskStatus } = require("../controllers/task.controller");
const verifyToken = require("../middeleware/VerifyToken");
const verifyRole = require("../middeleware/VerifyRole");
const router = express.Router();

router.get('/tasks/:projectId', [verifyToken] , getTasksByProject)
router.post('/task', [verifyToken , verifyRole] , createTask)
router.put('/task/status/:taskId' , [verifyToken] , updateTaskStatus)

module.exports = router;