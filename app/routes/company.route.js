module.exports =(app) => {
    const company =require('../controllers/company.controller')
    const router = require('express').Router()
    //

// link controllers
    //retrive all employee with setting
    router.get("/", company.findAll)
    // 
    app.use("/companies",router)
}