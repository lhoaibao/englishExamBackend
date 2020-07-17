const controller = require("../controllers/result.controllers");
const { authJwt } = require("../middlewares");
var router = require("express").Router();

module.exports = app => {

    // Retrieve all result
    router.post("/getResult", controller.getResult);

    // Retrieve a single Resutl with id
    // router.get("/:id", controller.findOne);

    app.use('/api/result', router);
};