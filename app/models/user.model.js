module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    ho: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ten: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tennguoidung: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    matkhau: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM("admin", "customer"),
      allowNull: false,
    },
  },
    {
      tableName: "user",
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          unique: true,
          fields: ["id"],
        },
      ],
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    });

  return User;
};