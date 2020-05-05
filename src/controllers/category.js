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
  const category = await Category.create({
    name: req.body.name,
    user: req.user.id,
    imageSrc: req.file ? req.file.path : ''
  });
  res.status(201).json(category);
}

const update = async (req, res) => {
  const updated = {
    name: req.body.name
  }
  if(req.file) updated.imageSrc = req.file.path;
  const category = await Category.findByIdAndUpdate(req.params.id, updated, {new: true});
  res.status(200).json(category);
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update
}