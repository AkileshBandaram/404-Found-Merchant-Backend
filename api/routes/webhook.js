const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhook");
router.post("/savetoken",webhookController.savetoken);

module.exports = router;