// 001 สร้างตัวแปร ในการเก็บค่าที่ดึงexpressเข้ามา
const express = require('express');
const app = express()
// port section
require('dotenv').config()
const PORT = process.env.PORT || 5000;

// middle ware เพื่อยอมรับไฟล์json form fontend
app.use(express.json())
// ยอมรับ key value 
app.use(express.urlencoded({extended: true}))

const db = require('./app/models')
db.sequelize.sync({force:false}).then(() => { //force คือการ
    console.log('Database is connected...')
})

//002 requestผู้ใช้ร้องขอ responseตอบกลับ
// สร้างตัวแปร app เพื่อเรียกใช้Method ต่างๆในexpress
app.get('/', (req,res) => {
    res.send('<--Default Route-->')
})

// route section
require('./app/routes/employee.route')(app)

//ทำให้file server.js สามารถทดสอบได้
app.listen(PORT, () => {
    console.log(`--Server is running on port ${PORT}--(status: normal)`)
})