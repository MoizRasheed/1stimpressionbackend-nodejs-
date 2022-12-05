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
require("dotenv").config()
const PORT = process.env.PORT || 4500
connectDB()

let corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions))
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

app.post("/admin/signup",async(req,res,next)=>{
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
        const findAdmin = await Admin.findOne({email:body.email})
        if(findAdmin){
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
        const admin = new Admin(data)
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
        await admin.save()
        return res.status(200).json({
            success: true,
            data: admin,
            msg: "Succesfully add new admin.",
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

app.post("/admin/signin",async(req,res,next)=>{
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
        const admin = await Admin.findOne({email:body.email})
        if(!admin){
            return res.status(400).json({
                success: false,
                data: "",
                msg: "Please enter valid email.",
                status: 400
            })
        }
        const validPassword = await bcrypt.compare(body.password, admin.password)
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

app.post("/consultant",async(req,res,next)=>{
    try {
        const {body} = req
        if(!body.name||!body.email||!body.contactNo||!body.address||!body.city){
            return res.status(400).json({
                success: false,
                data: "",
                msg: "All Fields Required.",
                status: 400
            })
        }
        const findConsultant = await Consultant.findOne({email:body.email})
        if(findConsultant){
            return res.status(400).json({
                success: false,
                data: "",
                msg: "Email already exist.",
                status: 400
            })
        }
        const data = {
            name: body.name,
            email: body.email,
            contactNo: body.contactNo,
            city: body.city,
            address: body.address
        }
        const consultant = new Consultant(data)
        await consultant.save()
        return res.status(200).json({
            success: true,
            data: consultant,
            msg: "Your details added Succesfully.",
            status: 200,
        })
    } catch (error) {
        return next(error)
    }
})

app.post("/accessories",upload.array("avatar",4),async(req,res,next)=>{
    try {
        console.log("file => ",req.files)
        let avatar=[]
        for(let i=0;i<req.files.length;i++){
            let result = await cloudinary.uploader.upload(req.files[i].path,{resource_type: req.files[i].mimetype.split('/')[0]})
            avatar.push({
                url:result.secure_url,
                video:req.files[i].mimetype.split('/')[0]==='video'?true:false
            })
        }
        // console.log("avatar => ",avatar)
        // const result = await cloudinary.uploader.upload(req.files.path)
        // let v=req.files.map(async e=>{
        //     let avatar = []
        //    let URLS = await cloudinary.uploader.upload(e.path,{resource_type: e.mimetype.split('/')[0]})
        //    console.log("URLS.secure_url => ",URLS.secure_url)
        //    avatar.push({url:URLS.secure_url})
        //    return avatar
        // })
        // console.log("avatar => ",v)
        let accessories = new Accessories({
            name:req.body.name,
            avatar
        })
        await accessories.save()
        return res.status(200).json({
            success: true,
            data: accessories,
            msg: "Your avatars added Succesfully.",
            status: 200,
        })
    } catch (error) {
        return next(error)
    }
})

app.get("/accessories",async(req,res,next)=>{
    try {
        let accessories = await Accessories.find()
        return res.status(200).json({
            success: true,
            data: accessories,
            msg: "",
            status: 200,
        })
    } catch (error) {
        return next(error)
    }
})

app.get("/consultant",async(req,res,next)=>{
    try {
        const consultant = await Consultant.find()
        return res.status(200).json({
            success: true,
            data: consultant,
            msg: "",
            status: 200,
        })
    } catch (error) {
        return next(error)
    }
})

app.listen(PORT, async()=>{
    console.log(`app is running on port ${PORT}`)
})