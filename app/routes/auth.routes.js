const { verifyRegister } = require("../middlewares");
const { validateForm } = require("../middlewares");
const controller = require("../controllers/auth.controllers");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/register",
        [
            validateForm.createValidator("register"),
            validateForm.checkValidationResult,
            verifyRegister.checkExistedTennguoidung,
        ],
        controller.register
    );

    app.post(
        "/api/auth/login", 
        [
            validateForm.createValidator("login"),
            validateForm.checkValidationResult
        ], 
        controller.signin);
};