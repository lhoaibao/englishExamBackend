const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controllers");

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/",[authJwt.verifyToken, authJwt.isAdmin], controller.listUser);

  app.get("/api/user/:id", controller.getUserInfo);

  app.delete("/api/user/:id",[authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);
}; 