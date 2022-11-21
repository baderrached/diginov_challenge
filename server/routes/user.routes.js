const router = require("express").Router();
const userController = require("../controllers/user.controller")
const verifyRole = require("../middeleware/VerifyRole");
const verifyToken = require("../middeleware/VerifyToken");
router.post("/signup",userController.signup);
router.post("/signin",userController.signin);
router.get("/developers",[verifyToken , verifyRole],userController.getDevelopers);
router.get("/managers",[verifyToken , verifyRole],userController.getManagers);
module.exports = router;