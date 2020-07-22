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


exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {
            id: id
        }
    }).then(function (deletedRecord) {
        if (deletedRecord === 1) {
            res.status(200).json({ message: "Deleted successfully" });
        }
        else {
            res.status(404).json({ message: "record not found" })
        }
    })
        .catch(function (error) {
            res.status(500).json(error);
        });
}


exports.listUser = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
}