const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// sync database 
// const db = require("./app/models");
// db.sequelize.sync();

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/test.routes")(app);
require("./app/routes/result.routes")(app);
 
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log("Server started on http://localhost:" + PORT) })

module.exports = app;