module.exports = (sequelize, Sequelize) => {
    const Result = sequelize.define("results", {
        userId: {
            type: Sequelize.INTEGER(11)
        },
        score: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        answer: {
            type: Sequelize.JSON,
            allowNull: false,
        }
    },
        {
            tableName: "result",
            createdAt: "created_at",
            updatedAt: "updated_at",
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        });

    return Result;
};