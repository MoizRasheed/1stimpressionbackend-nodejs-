const router = require("express").Router()
const { GetAccessoryForUser } = require("../../services/accessories")

router.get("/",GetAccessoryForUser)

module.exports = router