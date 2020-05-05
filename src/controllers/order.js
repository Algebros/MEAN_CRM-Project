const Order = require('../models/order');

const getAll = async (req, res) => {
  const query = {
    user: req.user.id,
    
  }
  if(req.query.start) {
    query.date = {
      $gte: req.query.start
    }
  }

  if(req.query.end) {
    if(!query.date) {
      query.date = {};
    }
    query.date['$lte'] = req.query.end
  }

  if(req.query.order) {
    query.order = +req.query.order
  }

  const order = await Order.find(query)
  .sort({ date: -1 })
  .skip(+req.query.offset)
  .limit(+req.query.limit);
  res.status(200).json(order);
}

const create = async (req, res) => {
  const lastOrder = await Order.findOne({ user: req.user.id })
  .sort({ date: -1 });

  const maxOrder = lastOrder ? lastOrder.order : 0;

  const order = await Order.create({
    list: req.body.list,
    user: req.user.id,
    order: maxOrder + 1,
  });
  res.status(201).json(order);
}

module.exports = {
  getAll,
  create
}