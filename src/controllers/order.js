const getAll = (req, res) => {
  res.status(200).json({
    login: 'login'
  })
}

const create = (req, res) => {
  res.status(200).json({
    login: 'reg'
  })
}

module.exports = {
  getAll,
  create
}