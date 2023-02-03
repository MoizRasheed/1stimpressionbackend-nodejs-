const router = require("express").Router()
const {
    Accessory,
    GetAccessory
} = require("../../services/accessories")
const upload = require("../../cloud/multer")

router.post("/",upload.array("avatar",4),Accessory)
router.get("/",GetAccessory)

module.exports = router