const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const checkAuth = require("../middleware/auth")
router.get("/",checkAuth,userController.getuserdata)

module.exports = router;