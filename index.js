const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const Users = require("./models/user")
const bcrypt = require("bcrypt")
const connectDB = require("./db")
require("dotenv").config()
const PORT = process.env.PORT || 4500
connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post("/signup",async(req,res,next)=>{
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
        const findUser = await Users.findOne({email:body.email})
        if(findUser){
            return res.status(400).json({
                success: false,
                data: "",
                msg: "Email already exist.",
                status: 400
            })
        }
        if(body.password.length<6){
            return res.status(400).json({
                success: false,
                data: "",
                msg: "Password length minimum 6",
                status: 400
            })
        }
        const data = {
            name: body.name,
            email: body.email,
            password: body.password
        }
        const user = new Users(data)
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()
        return res.status(200).json({
            success: true,
            data: user,
            msg: "Succesfully add new user.",
            status: 200,
        })
    } catch (error) {
        return next(error)
    }
})

app.post("/signin",async(req,res,next)=>{
    try {
        const {body} = req
        if(!body.email||!body.password){
            return res.status(400).json({
                success: false,
                data: "",
                msg: "Please Enter Email and password.",
                status: 400
            })
        }
        const user = await Users.findOne({email:body.email})
        if(!user){
            return res.status(400).json({
                success: false,
                data: "",
                msg: "Please enter valid email.",
                status: 400
            })
        }
        const validPassword = await bcrypt.compare(body.password, user.password)
        if(validPassword){
            return res.status(200).json({
                success: true,
                data: "",
                msg: "Succesfully signin.",
                status: 200,
            })
        }
        else{
            return res.status(400).json({
                success: false,
                data: '',
                msg: "Password wrong.",
                status: 400,
            })
        }
    } catch (error) {
        return next(error)
    }
})

app.listen(PORT, async()=>{
    console.log(`app is running on port ${PORT}`)
})