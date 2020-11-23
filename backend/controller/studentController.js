const { validationResult } = require('express-validator');
const User = require('../model/userModel')

const getUsers = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    results.totalCount = await User.countDocuments().exec()

    if (endIndex < (await User.countDocuments().exec())) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.prev = {
            page: page - 1,
            limit: limit,
        };
    }
    try {
        results.current = await User.find().limit(limit).skip(startIndex).exec();
        res.json(results);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const addUser = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    const { name, email, bloodGroup, gender, city } = req.body
    const avatar = req.file.path
    const newUser = new User({ name, email, avatar, bloodGroup, gender, city })

    newUser.save()
        .then((data) => res.json(data)).catch(err => console.log("error" + err))
}

const getStudent = async (req, res) => {
    const { email } = req.params

    let findData = await User.findOne({
        email: email
    })
    if (findData) {
        res.status(200).json(findData)
    }
    else {
        res.status(404).json({ error: "Item not found" })
    }
}

const updateStudent = (req, res) => {
    const email = req.params.email
    console.log(req.body, req.file)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    User.findOne({ email: email })
        .then((editItem) => {

            editItem.name = req.body.name || editItem.name
            editItem.bloodGroup = req.body.bloodGroup || editItem.bloodGroup
            editItem.email = req.body.email || editItem.email
            editItem.city = req.body.city || editItem.city
            editItem.avatar = req.file.path || editItem.avatar
            editItem.gender = req.body.gender || editItem.gender

            editItem.save()
                .then(() => res.json("Student updated successfully!"))
                .catch((err) => res.status(400).json("Error" + err))
        })
        .catch((err) => res.status(400).json("Error" + err))
}

const deleteStudent = (req, res) => {
    let id = req.params.id
    User.findByIdAndDelete(id)
        .then(() => res.json("User Deleted Successfully!"))
        .catch((err) => res.status(400).json("error occurred" + err))
}

module.exports = { getUsers, addUser, getStudent, updateStudent, deleteStudent }