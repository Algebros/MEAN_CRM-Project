const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../.env')
});

module.exports = {
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  MONGO_URL: process.env.MONGO_URL
};
