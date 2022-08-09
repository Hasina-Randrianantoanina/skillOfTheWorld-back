const express = require("express");

const candidatCtlr = require("../controllers/candidat.controller");

const router = express.Router();

router.post("/signup", candidatCtlr.signup);
router.post("/login", candidatCtlr.singIn);
router.get("/logout", candidatCtlr.logout);

module.exports = router;
