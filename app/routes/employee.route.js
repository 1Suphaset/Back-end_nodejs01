module.exports =(app) => {
    const employee =require('../controllers/employee.controller')
    const router = require('express').Router()
    //

// link controllers
    //retrive all employee with setting
    router.get("/",employee.findAll)
    router.get("/edit-employee/:id",employee.findOne)
    router.post("/create-employee-setting",employee.create)
    router.put("/update-employee/:id",employee.update)
    router.delete("/delete-employee/:id",employee.delete)

    // 
    app.use("/employees",router)
}