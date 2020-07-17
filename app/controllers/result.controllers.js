const db = require("../models");
const Result = db.result;
const Test = db.test;


function getTestAnswer(test){
    var testAnswer = []
    data = test.questions.all
    for (i = 0; i< data.length; i++){
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
    answer = req.body.answer
    testId = req.body.testId

    var test = await Test.findByPk(testId)
    var score = await getScore(test, answer)
    result = {
        testId: testId,
        userId: req.body.userId?req.body.userId:null,
        answer: answer,
        score: score
    }
    Result.create(result)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Test."
            });
        });
}
