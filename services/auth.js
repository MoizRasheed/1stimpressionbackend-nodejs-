const Users = require("../models/user")
const Admin = require("../models/admin")
const bcrypt = require("bcrypt")

exports.signupForUser = async (req, res, next) => {
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
      return next(error);
    }
}

exports.signinForUser = async (req, res, next) => {
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
}

exports.signupForAdmin = async (req, res, next) => {
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
}

exports.signinForAdmin = async (req, res, next) => {
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
}