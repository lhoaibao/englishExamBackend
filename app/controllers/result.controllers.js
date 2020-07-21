const db = require("../models");
const { result } = require("../models");
const Result = db.result;
const Test = db.test;
const User = db.user;
const sequelize = require("sequelize");


function getTestAnswer(test) {
    var testAnswer = []
    data = test.questions.all
    for (i = 0; i < data.length; i++) {
        testAnswer.push(...data[i].answer)
    }
    return testAnswer
}

async function getScore(answer, myanswer) {
    score = 0
    var testAnswer = await getTestAnswer(answer)
    testAnswer.map(function (val, index) {
        if (val == myanswer[index]) {
            score++;
        }
    })
    return score.toString();
}


exports.getResult = async (req, res) => {
    var answer = req.body.answer === undefined ? false : req.body.answer
    var testId = req.body.testId === undefined ? false : req.body.testId
    var tennguoidung = req.body.tennguoidung === undefined ? false : req.body.tennguoidung

    if (!answer || !testId) {
        res.send("missing field")
    }

    var test = await Test.findByPk(testId)
    if (!test) {
        res.send("testId not found")
        return
    }

    var user = await User.findAll({
        attributes: ["tennguoidung"],
        where: {
            tennguoidung: tennguoidung,
        },
    })
    console.log(user)
    if (!user.length) {
        res.send("user not found")
        return
    }

    var score = await getScore(test, answer)

    
    var result = {
        testId: testId,
        tennguoidung: tennguoidung ? tennguoidung : null,
        answer: answer,
        score: score,
        grade: test.grade
    }
    check = await Result.findAll({
        attributes: ["id", "score"],
        where: {
            tennguoidung: tennguoidung,
            testId: testId
        },
    })
    if (check.length) {
        if (check[0].score < score) {
            Result.update(
                result,
                { where: { id: check[0].id } }
            )
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Result."
                    });
                });
        }
        res.send(result)
        return
    }
    Result.create(result)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Result."
            });
        });
    return
}

exports.getUserResult = async (req, res) => {
    userId = req.param('userId')
    condition = { userId: userId }
    Result.findAll({ where: condition }).then(data => {
        res.send(data)
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Results."
            });
        });
}


async function sumScore(table) {
    var result = {}
    for (i = 0; i < table.length; i++) {
        key = table[i].tennguoidung
        if (key in result) {
            result[key]["totalScore"] += parseInt(table[i].score)
            result[key]["totalTest"] += 1
            continue
        }
        result[key] = { "totalScore": parseInt(table[i].score), "totalTest": 1 }
    }
    return result
}


async function rank(data) {
    var totalscoreboard = Object.keys(data).map(function (key) {
        return [key, data[key]['totalScore']]
    });

    var totaltestboard = Object.keys(data).map(function (key) {
        return [key, data[key]['totalTest']]
    });

    totalscoreboard.sort(function (first, second) {
        return second[1] - first[1];
    });


    totaltestboard.sort(function (first, second) {
        return second[1] - first[1];
    });
    return [totalscoreboard, totaltestboard]
}


async function getNumberResult(grade) {
    var result = await Result.findAll({
        attributes: ["tennguoidung", "score"],
        where: {
            tennguoidung: {
                [sequelize.Op.not]: null
            },
            grade: grade
        },
    })
    var data = await sumScore(result)
    result = {}
    table = await rank(data)
    result["totalscoreboard"] = table[0]
    result["totaltestboard"] = table[1]
    return result
}


exports.getScoreBoard = async (req, res) => {
    grade = req.param("grade") === undefined ? false : req.param("grade")
    if (!grade || !["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"].includes(grade)) {
        res.send("missing grade or wrong grade")
    }
    var a = await getNumberResult(grade)
    res.send(a)
}
