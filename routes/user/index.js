const router = require("express").Router()
const Auth = require("./auth")
const Accessory = require("./accessories")

router.use("/auth",Auth)
router.use("/accessory",Accessory)

module.exports = router