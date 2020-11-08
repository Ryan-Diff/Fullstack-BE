const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(require('cors')());

app.use('/api/v1/plants', require('./controllers/Plant'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
