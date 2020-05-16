const express = require('express');
const passport = require('passport');
const path = require('path');
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

const guard = passport.authenticate('jwt', {session: false});
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', catchErrors(authRoute));
app.use('/api/analytics', guard, catchErrors(analyticsRoute));
app.use('/api/category', guard, catchErrors(categoryRoute));
app.use('/api/order', guard, catchErrors(orderRoute));
app.use('/api/position', guard, catchErrors(positionRoute));
app.use('*', catchErrors(async (req, res) => {
  throw new ErrorHandler(getStatusCode('Not Found'), getStatusText(404));
}));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'client', 'index.html'
      )
    )
  })
}

app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;