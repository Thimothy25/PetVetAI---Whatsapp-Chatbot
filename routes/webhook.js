// routes/webhook.js
const express = require("express");
const router = express.Router();

const { handleWA } = require("../Controllers/AIController");

router.post("/", handleWA);

module.exports = router;
