const getAll = (req, res) => {
  res.status(200).json({
    login: 'login'
  })
}

const getById = (req, res) => {
  res.status(200).json({
    login: 'reg'
  })
}

const remove = (req, res) => {
  res.status(200).json({
    login: 'reg'
  })
}

const create = (req, res) => {
  res.status(200).json({
    login: 'reg'
  })
}

const update = (req, res) => {
  res.status(200).json({
    login: 'reg'
  })
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update
}