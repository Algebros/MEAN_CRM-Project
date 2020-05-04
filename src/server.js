const app = require('./index');
const mongoose = require('mongoose');
const { PORT, MONGO_URL } = require('./config');

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  mongoose.connection.dropDatabase();
  console.log('MongoDB connected!');
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
})