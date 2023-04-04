const express = require("express");
const router = express.Router();

const ctrl = require("./index.ctrl");

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/search", ctrl.getData);

module.exports = router;
