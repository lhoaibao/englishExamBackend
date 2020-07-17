const db = require("../models");
const Test = db.test;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Test
    const test = {
        name: req.body.name,
        grade: req.body.grade,
        type: req.body.type,
        questions: req.body.questions
    };
    console.log(test)

    // Save Test in the database
    Test.create(test)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Test."
            });
        });
};

exports.findAll = (req, res) => {

    Test.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tests."
            });
        });
};

exports.searchName = (req, res) => {
    const name = req.param("name");
    var condition = { name: { [Op.like]: `%${name}%` } };

    Test.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tests."
            });
        });
};

exports.filter = (req, res) => {
    const grade = req.param('grade');
    const type = req.param('type');
    var condition
    if (type) {
        condition = { grade: grade, type: type }
    } else {
        condition = { grade: grade }
    }

    Test.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tests."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Test.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Test.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Test was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Test with id=${id}. Maybe Test was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Test with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Test.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Test was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Test with id=${id}. Maybe Test was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Test with id=" + id
            });
        });
};

