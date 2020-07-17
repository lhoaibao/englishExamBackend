const controller = require("../controllers/test.controllers");
const { authJwt } = require("../middlewares");
var router = require("express").Router();

module.exports = app => {
    // Create a new Test
    // router.post("/", [authJwt.verifyToken, authJwt.isAdmin], controller.create);
    router.post("/", controller.create);

    // Retrieve all tests
    router.get("/", controller.findAll);

    // Search test
    router.get("/search", controller.searchName);

    // Retrieve all tests grade
    router.get("/filter/", controller.filter);

    // Retrieve a single Test with id
    router.get("/:id", controller.findOne);

    // Update a Test with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.update);

    // Delete a Test with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);

    app.use('/api/test', router);
};