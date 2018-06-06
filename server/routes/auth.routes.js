const express = require("express");
const router = express.Router();

const authController = require("./controllers/auth.controller");


router.route("/api/register")
        .post(authController.register);

router.route("/api/login")
        .post(authController.login);


module.exports = router;