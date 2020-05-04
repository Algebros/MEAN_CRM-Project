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
const { handleError, catchErrors, ErrorHandler } = require('./utils/error');
const { getStatusCode, getStatusText } = require('http-status-codes');
const app = express();

app.use(express.json());
app.use(passport.initialize());
passportJwt(passport);
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({msg: 'ok'})
});
// passport.authenticate('jwt', {session: false}),
app.use('/api/auth', catchErrors(authRoute));
app.use('/api/analytics', catchErrors(analyticsRoute));
app.use('/api/category', catchErrors(categoryRoute));
app.use('/api/order', catchErrors(orderRoute));
app.use('/api/position', catchErrors(positionRoute));
app.use('*', catchErrors(async (req, res) => {
  throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
}));

app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;