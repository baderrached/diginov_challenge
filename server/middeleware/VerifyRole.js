var jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/auth.config");
const loggerFunction = require("../utils/loggerFunction");
const log4j = require("../config/configLog4js.js");
const util = require("../utils/Utils");

function verifyRole(req, res, next) {

  if (!req.headers.authorization) {
    log4j.loggerinfo.info(403, `VerifyRole : ${err.message}`);
    util.setError(403, "No token provided.");
    return util.send(res);
  }
  let token = (req.headers.authorization).replace("Bearer ", "");


  jwt.verify(token, SECRET_KEY, function (err, decoded) {
    if (err) {
      console.log(err);
      log4j.loggerinfo.info(401, `VerifyRole : ${err.message}`);
      util.setError(401, "Failed to authenticate token.");
      return util.send(res);
      
    }

    if (decoded.role == "manager") {
      next();
    } else {
      log4j.loggerinfo.info(401, `VerifyRole forbiden: ${req.userId}`);
      util.setError(401, "Forbiden");
      return util.send(res);
    }
  });
}

module.exports = verifyRole;