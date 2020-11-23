const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const userRoute = require('./routes/userRoute')

const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, db) => {
    if (err)
        console.log(err);
    else console.log("Database is connected!");
})

app.use('/', userRoute)

app.listen(8000, () => {
    console.log("Server is running up at port 8000")
})