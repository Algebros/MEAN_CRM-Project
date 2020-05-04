const express = require('express');
const passport = require('passport');
const passportJwt = require('./middleware/passport');
const cors = require('cors');
const morgan = require('morgan');
const authRoute = require('./routes/auth');
const analyticsRoute = require('./routes/analytics');
const categoryRoute = require('./routes/category');
const orderRoute = require('./routes/order');
const positionRoute = require('./routes/position');
const app = express();

app.use(express.json());
app.use(passport.initialize());
passportJwt(passport);
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({msg: 'ok'})
});

app.use('/api/auth', authRoute);
app.use('/api/analytics', analyticsRoute);
app.use('/api/category', passport.authenticate('jwt', {session: false}), categoryRoute);
app.use('/api/order', orderRoute);
app.use('/api/position', positionRoute);

module.exports = app;