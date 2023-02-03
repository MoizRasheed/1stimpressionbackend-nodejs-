const router = require("express").Router()
const {
    signupForAdmin,
    signinForAdmin
} = require("../../services/auth")

router.post("/signup",signupForAdmin)
router.post("/signin",signinForAdmin)

module.exports = router