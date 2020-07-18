const db = require("../models");
const User = db.user;

exports.getUserInfo = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send({
                id: data.id,
                ho: data.ho,
                ten: data.ten,
                tennguoidung: data.tennguoidung
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
}