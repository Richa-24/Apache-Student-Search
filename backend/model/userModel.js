const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://images-na.ssl-images-amazon.com/images/I/31O639VgP6L.jpg"
    }

}, {
    versionKey: false
})

module.exports = mongoose.model('User', userSchema)