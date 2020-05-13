const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categorySchema'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'userSchema'
  },
  quantity: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('positionSchema', positionSchema);