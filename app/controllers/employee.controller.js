// get
const db = require('../models')
const Employee = db.employee
const Setting =db.setting


exports.findAll = (req,res) => {
    try{
        Employee.findAll({
            attributes: ["id","name","position"],
            include: [{
                model: Setting,
                attributes: ["theme"]
            }]
        })
        .then(employee => {
            res.status(200).json(employee)
        }).catch( error => {
            res.send(400).json({message:error.message})
        })
    }catch(e){
        res.send(500).json({message:error.message})

    }
}
exports.create = (req,res) => {
/* 01 ตรวจจับข้อมูล เพื่อไม่ให้เกิดการเพิ่มข้อมูลที่เป็นค่าว่าง 
    02 สร้างตัวแปร เพื่อเก็บค่าที่ถูกเพิ่มมาจากfont end
    03
*/

    try{
        if(!req.body.name | !req.body.position){
            res.status(400).json({message : "data cannot empty!"})
            return;
        }

        const employeeObj = { //รับค่าจากfont end
            name: req.body.name,
            position: req.body.position
        }
        Employee.create(employeeObj)
        .then(data => {
            res.send(employeeObj)
            console.log(data)
            // insert to Setting Table
            Setting.create({
                theme: req.body.theme,
                employeeId: data.id
            })
            res.status(200).json({message: "saved"})
        }).catch(error => {
            res.status(400).json({message:error.message})
        })     
    }catch(e){
        res.sendStatus(500).json({message:error.message})
    }

}
exports.findOne = (req,res) => {
// res.send("findOne")
    try{
        const id = req.params.id
        Employee.findByPk(id)
        .then(data => {
            res.status(200).json(data)
        }).catch(error => {
            res.status(400).json({message:error.message})
        })
    }catch(error){
        // console.log(err.message)
        res.status(500).json({message:error.message})

    }
}
exports.update = (req,res) => {
    // res.send("Update")
    try{
    const id = req.params.id
    
    const employeeObj = {
        name: req.body.name,
        position: req.body.position
    }
    Employee.update(req.body, {
        where: {id:id},
        })
    
    .then(data => {
        if (data == 1){
            res.status(200).json({message: "Updated successfully.."})
        }
    }).catch(error => {
        res.status(400).json({message:error.message})
    })
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
exports.delete = (req,res) => {
    // res.send("delete")
    try {
        Employee.destroy({where: {id:req.params.id}})
        .then(data => {
            if (data == 1){
                res.status(200).json({message: "Delete successfully.."})
            }
        }).catch(error => {
            res.status(400).json({message:error.message})
        })
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
}