const express = require('express');
const app = express();

app.use('/apps', require('./routes/index'));

app.listen(5000, () => console.log('Express is running on port 5000'));
