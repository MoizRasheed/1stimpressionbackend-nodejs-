const router = require("express").Router()
const {
    Consultant,
    GetConsultant
} = require("../../services/consultant")

router.post("/",Consultant)
router.get("/",GetConsultant)

module.exports = router