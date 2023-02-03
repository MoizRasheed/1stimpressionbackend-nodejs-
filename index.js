const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const Users = require("./models/user")
const Admin = require("./models/admin")
const Consultant = require("./models/consultation")
const bcrypt = require("bcrypt")
const connectDB = require("./db")
const upload = require("./cloud/multer")
const cloudinary = require("./cloud/cloudinary")
const Accessories = require("./models/accessories")
const UserRoutes = require("./routes/user")
const AdminRoutes = require("./routes/admin")
require("dotenv").config()
const PORT = process.env.PORT || 4500
connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api/user",UserRoutes)
app.use("/api/admin",AdminRoutes)

app.listen(PORT, async()=>{
    console.log(`app is running on port ${PORT}`)
})