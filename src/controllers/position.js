const Position = require('../models/position');

const getByCategoryId = async (req, res) => {
  const position = await Position.find({
    category: req.params.categoryId,
    user: req.user.id
  });
  res.status(200).json(position);
}

const create = async (req, res) => {
  const position = await Position.create({
    name: req.body.name,
    cost: req.body.cost,
    category: req.body.category,
    user: req.user.id
  })
  res.status(201).json(position);
}

const remove = async (req, res) => {
  await Position.remove({ _id: req.params.id });
  res.status(200).json({
    message: 'Position removed'
  });
}

const update = async (req, res) => {
  const position = await Position.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(position);
}

module.exports = {
  getByCategoryId,
  create,
  remove,
  update
}