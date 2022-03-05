const express = require('express');
const { posts } = require('../controller/controller');
const router = express.Router();

router.get('/posts',posts);

module.exports = router;