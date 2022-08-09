const express = require("express");

const entrepriseCtlr = require("../controllers/entreprise.controller");

const router = express.Router();

router.post("/signup", entrepriseCtlr.signup);
router.post("/login", entrepriseCtlr.singIn);
router.get("/logout", entrepriseCtlr.logout);

module.exports = router;
