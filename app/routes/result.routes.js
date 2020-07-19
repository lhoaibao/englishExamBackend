const controller = require("../controllers/result.controllers");
const { authJwt } = require("../middlewares");
var router = require("express").Router();

module.exports = app => {

    // Retrieve a result
    router.post("/getResult", controller.getResult);

    // Retrieve a all Resutl of User
    router.get("/", controller.getUserResult);

    router.get("/scoreboard", controller.getScoreBoard)

    app.use('/api/result', router);
};