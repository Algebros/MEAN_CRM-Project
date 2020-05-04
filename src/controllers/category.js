const Category = require('../models/category');
const Position = require('../models/position');

const getAll = async (req, res) => {
  const category = await Category.find({ user: req.user.id });
  res.status(200).json(category);
};

const getById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json(category);
}

const remove = async (req, res) => {
  await Category.remove({ _id: req.params.id });
  await Position.remove({ category: req.params.id });
  res.status(200).json({
    message: 'Category removed'
  });
}

const create = async (req, res) => {

}

const update = async (req, res) => {

}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update
}