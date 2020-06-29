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

  app.get("/api/demo/", controller.allAccess);

  app.get(
    "/api/demo/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  
  app.get(
    "/api/demo/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
}; 