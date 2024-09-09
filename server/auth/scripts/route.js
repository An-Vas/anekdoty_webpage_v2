const express = require("express")
const router = express.Router()
const { signup, signin } = require("./do-auth")
const {adminAuth, anyAuth} = require("./check-roles");


router.route("/signup").post(signup)
router.route("/signin").post(signin);

router.route("/admin").get(adminAuth, (req, res) => res.send("Admin Route"));
router.route("/user").get(anyAuth, (req, res) => res.send("User Route"));


module.exports = router