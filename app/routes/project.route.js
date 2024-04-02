module.exports =(app) => {
    const project =require('../controllers/project.controller')
    const router = require('express').Router()
    //

// link controllers
    //retrive all employee with setting
    router.get("/", project.findAll)
    // 
    app.use("/projects",router)
}