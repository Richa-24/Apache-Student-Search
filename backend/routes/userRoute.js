const express = require("express")
const { param, body, validationResult } = require("express-validator")
const multer = require("multer")
const path = require("path")

const router = express.Router()
const { getUsers, addUser, getStudent, updateStudent, deleteStudent } = require('../controller/userController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/png") {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


router.get('/getusers', getUsers)
router.post('/adduser', upload.single("avatar"), [body('email').isEmail()], addUser)
router.put('/student/:email', getStudent)
router.put('/update/:email', upload.single("avatar"), [param('email').isEmail()], updateStudent)
router.delete('/delete/:id', deleteStudent)

module.exports = router