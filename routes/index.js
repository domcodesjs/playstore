const express = require('express');
const router = express.Router();
const { sortApps } = require('../controllers/appsController');

router.get('/', sortApps);

module.exports = router;
