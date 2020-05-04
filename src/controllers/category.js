const getAll = (req, res) => {
  res.status(200).json({
    login: 'category getAll'
  })
};

const getById = (req, res) => {
  res.status(200).json({
    login: 'category getById'
  })
}

const remove = (req, res) => {
  res.status(200).json({
    login: 'category remove'
  })
}

const create = (req, res) => {
  res.status(200).json({
    login: 'category create'
  })
}

const update = (req, res) => {
  res.status(200).json({
    login: 'category update'
  })
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update
}