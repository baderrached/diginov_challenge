const bcrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");
const loggerFunction = require("../utils/loggerFunction");
const log4j = require("../config/configLog4js.js");
const authConfig = require("../config/auth.config.js");
const util = require("../utils/Utils");
const { loginSchemaValidations, registerSchemaValidations } = require("../validations");
const User = db.user;

module.exports.signup = async (req, res) => {
    const { error } = registerSchemaValidations(req.body);
    if (error) {
        log4j.loggererror.error(error.details[0].message);
        util.setError(400, error.details[0].message);
        return util.send(res);
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
        log4j.loggerinfo.info(400, "Email already exist");
        util.setError(400, {
            msg: "Email already exist",
        });
        return util.send(res);
    } else {
        const newUser = new User(req.body);
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then((user) => {
                        log4j.loggerinfo.info(200, "User created succesfully");
                        util.setSuccess(200, 'user created succesfully', user);
                        return util.send(res);
                    }
                    )
                    .catch((err) => console.log(err));
            });
        });
    }
}

    module.exports.getDevelopers = async (req, res) => {
      loggerFunction.loggerFunction(req, res);
  
      try {
        const developers = await User.find({ role: "user" })
        
        if (!developers) {
          log4j.loggerinfo.info(404, "No projects foud");
          util.setError(404, {
            msg: "No developers found",
          });
          return util.send(res);
        }
        log4j.loggerinfo.info(200, "developers fetched");
        util.setSuccess(200, 'find and count developers list', developers);
        return util.send(res);
      } catch (error) {
        log4j.loggerinfo.info(500, `getDevelopers : ${error.message}`);
        util.setError(500, "Cannot get data");
        return util.send(res);
      }
    }

    module.exports.getManagers = async (req, res) => {
        loggerFunction.loggerFunction(req, res);
    
        try {
          const managers = await User.find({ role: "manager" })
          
          if (!managers) {
            log4j.loggerinfo.info(404, "No projects foud");
            util.setError(404, {
              msg: "No managers found",
            });
            return util.send(res);
          }
          log4j.loggerinfo.info(200, "managers fetched");
          util.setSuccess(200, 'find and count managers list', managers);
          return util.send(res);
        } catch (error) {
          log4j.loggerinfo.info(500, `getmanagers : ${error.message}`);
          util.setError(500, "Cannot get data");
          return util.send(res);
        }
      }

module.exports.signin = (req, res) => {
    const { error } = loginSchemaValidations(req.body);

    if (error) {
        log4j.loggererror.error(error.details[0].message);
        util.setError(400, error.details[0].message);
        return util.send(res);
    }

    const { email, password } = req.body;
    // Find user by email
    User.findOne({ email }).then((user) => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // Create JWT Payload
                const payload = {
                    _id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: user.role
                };

                // Sign token
                jwt.sign(
                    payload,
                    authConfig.SECRET_KEY, {
                    expiresIn: 86400 // 24 hours
                },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            data: payload,
                        });
                    }
                );
            } else {
                log4j.loggerinfo.info(400, "Password incorrect");
                util.setError(400, {
                    msg: "Password incorrect",
                });
                return util.send(res);
            }
        });
    });
};