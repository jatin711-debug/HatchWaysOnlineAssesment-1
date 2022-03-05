const express = require('express');
const { ping } = require('../controller/controller');
const router = express.Router();

router.get('/ping',ping);

module.exports = router;