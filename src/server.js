const app = require('./index');
const { PORT } = require('./config');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);