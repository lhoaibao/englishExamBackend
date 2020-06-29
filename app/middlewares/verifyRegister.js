const db = require("../models");
const User = db.user;

checkExistedTennguoidung = (req, res, next) => {
    // tennguoidung
    User.findOne({
        where: {
            tennguoidung: req.body.tennguoidung
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Tennguoidung is already in use!"
            });
            return;
        }
        next();
    });
};

const verifyRegister = {
    checkExistedTennguoidung: checkExistedTennguoidung,
};

module.exports = verifyRegister;
