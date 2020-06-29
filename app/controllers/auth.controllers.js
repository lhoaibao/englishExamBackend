const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.register = (req, res) => {
    User.create({
        ho: req.body.ho,
        ten: req.body.ten,
        tennguoidung: req.body.tennguoidung,
        matkhau: bcrypt.hashSync(req.body.matkhau, 8),
        role: "customer",
    }).then(user => {
        res.status(200).send({
            ho: user.ho,
            ten: user.ten,
            tennguoidung: user.tennguoidung,
            roles: user.role,
        });
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            tennguoidung: req.body.tennguoidung
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.matkhau,
                user.matkhau
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};