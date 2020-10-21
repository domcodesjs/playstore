const express = require('express');
const app = express();

app.use('/apps', require('./routes/index'));

module.exports = app;
