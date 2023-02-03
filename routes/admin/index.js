const router = require("express").Router()
const Auth = require("./auth")
const Consultant = require("./consultant")
const Accessory = require("./accessories")

router.use("/auth",Auth)
router.use("/consultant",Consultant)
router.use("/accessory",Accessory)

module.exports = router