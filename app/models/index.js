const config =require("../config/db")

const Datatype = require("sequelize")
const sequelize = new Datatype(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool:{
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {}
db.Datatype = Datatype
db.sequelize = sequelize

db.employee = require("./employee.model")(sequelize,Datatype)
db.setting = require("./setting.model")(sequelize,Datatype)

//connecting table
db.employee.hasOne(db.setting, { //primarykey
    onDelete:'CASCADE'
})
db.setting.belongsTo(db.employee) // foreign key

module.exports = db