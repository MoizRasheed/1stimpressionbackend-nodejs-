const Consultation = require("../models/consultation")

exports.Consultant = async (req, res, next) => {
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
        const findConsultant = await Consultation.findOne({email:body.email})
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
        const consultant = new Consultation(data)
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
}

exports.GetConsultant = async (req, res, next) => {
    try {
        const consultant = await Consultation.find()
        return res.status(200).json({
            success: true,
            data: consultant,
            msg: "",
            status: 200,
        })
    } catch (error) {
        return next(error)
    }
}