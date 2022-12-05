const multer = require('multer')
const path = require('path')

const upload = multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        path.extname(file.originalname)
        cb(null,true)
    }
})

module.exports=upload