const Sequelize = require("sequelize")

const sequelize = new Sequelize('book_appointment', 'root', 'Gangrinpoche&112', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;