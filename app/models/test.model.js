module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define("tests", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        grade: {
            type: Sequelize.ENUM("Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"),
            allowNull: false,
        },
        type: {
            type: Sequelize.ENUM("15 phút", "45 phút", "giữa kì 1", "cuối kì 1", "giữa kì 2", "cuối kì 2"),
            allowNull: false,
        },
        questions: {
            type: Sequelize.JSON,
            allowNull: false
        }
    },
        {
            tableName: "test",
            createdAt: "created_at",
            updatedAt: "updated_at",
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        });

    return Test;
};