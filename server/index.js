const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var log4js = require("log4js");
const log4j = require("./config/configLog4js");
const app = express()
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { URI, options } = require("./config/db.config");

app.use(cors());
app.use(bodyParser.json());
app.use(log4js.connectLogger(log4j.loggercheese, {
  level: "info"
}));

const userRouter = require('./routes/user.routes');
const projectRouter = require('./routes/project.routes');
const taskRouter = require('./routes/task.routes');



// database
const db = require("./models");

const url = `mongodb+srv://bader:bader@123@cluster0.feohbwz.mongodb.net/?retryWrites=true&w=majority`;
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect('mongodb+srv://bader:bader123@cluster0.huyqamn.mongodb.net/?retryWrites=true&w=majority')
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

app.use('/api', [
  taskRouter,
  userRouter,
  projectRouter
]);


const PORT = process.env.APP_PORT || 5004;
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log('Server listening on port: ', PORT);
});
