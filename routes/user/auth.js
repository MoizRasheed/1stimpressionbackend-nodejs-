const router = require("express").Router()
const {
    signupForUser,
    signinForUser
} = require("../../services/auth")

router.post("/signup",signupForUser)
router.post("/signin",signinForUser)

module.exports = router