const express = require('express');
const authRoute = require('./routes/auth');
const app = express();

app.get('/', (req, res) => {
  res.json({msg: 'ok'})
});

app.use('/api/auth', authRoute);

module.exports = app;