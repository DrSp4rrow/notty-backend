const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");

router.get("/api/show-cookie", profileController.getDataByCookie);
router.post("/api/logout", profileController.logoutProfile);
module.exports = router;
