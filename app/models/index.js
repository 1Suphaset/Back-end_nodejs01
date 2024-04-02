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
db.company = require("./company.model")(sequelize,Datatype)
db.project = require("./project.model")(sequelize,Datatype)
db.employee_project = require("./employee_project.model")(sequelize,Datatype)

//connecting table

// one to one 
db.employee.hasOne(db.setting, { //primarykey
    onDelete:'CASCADE'
})
db.setting.belongsTo(db.employee) // foreign key

// one to many
db.company.hasMany(db.employee, {
    onDelete:'CASCADE'

});
db.employee.belongsTo(db.company);

// many to many
db.employee.belongsToMany(db.project, {
    through: "Employee_project",
    onDelete:'CASCADE'

})
db.project.belongsToMany(db.employee, {
    through: "Employee_project",
    onDelete:'CASCADE'

})

module.exports = db