const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const userSchema =require("./models/user")
const connectDB = require("./db")
require("dotenv").config()
const PORT = process.env.PORT || 4500
connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post("/users",async(req,res,next)=>{
    try {
        const {body} = req
        if(!body.name||!body.email||!body.password){
            return res.status(400).json({
                success: false,
                data: "",
                msg: "Name, Email and password must add.",
                status: 400
            })
        }
        const data = {
            name: body.name,
            email: body.email,
            password: body.password
        }
        const user = new userSchema(data)
        await user.save()
        return res.status(200).json({
            success: true,
            data: user,
            msg: "Suuccesfully add new user.",
            status: 200,
        })
    } catch (error) {
        return next(error)
    }
})
app.listen(PORT, async()=>{
    console.log(`app is running on port ${PORT}`)
})