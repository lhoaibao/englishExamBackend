module.exports = (sequelize, Sequelize) => {
    const Result = sequelize.define("results", {
        tennguoidung: {
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        answer: {
            type: Sequelize.JSON,
            allowNull: false,
        },
        grade:{
            type: Sequelize.STRING,
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