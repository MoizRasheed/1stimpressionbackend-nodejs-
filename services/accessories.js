const Accessories = require("../models/accessories")
const cloudinary = require("../cloud/cloudinary")

exports.Accessory = async (req, res, next) => {
    try {
        console.log("file => ",req.files)
        console.log("file => ",req.file)
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
}

exports.GetAccessory = async (req, res, next) => {
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
}