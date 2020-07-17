const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  },
  {
    define: {
      charset: 'utf8mb4',
      timestamps: true
    },
    logging:false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.test = require("../models/test.model.js")(sequelize, Sequelize);
db.result = require("../models/result.model.js")(sequelize, Sequelize);

db.test.hasMany(db.result, {as: "results", foreignKey: { allowNull: false }})

module.exports = db;