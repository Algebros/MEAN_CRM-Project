const getByCategoryId = (req, res) => {
  res.status(200).json({
    login: 'login'
  })
}

const create = (req, res) => {
  res.status(200).json({
    login: 'reg'
  })
}

const remove = (req, res) => {
  res.status(200).json({
    login: 'login'
  })
}

const update = (req, res) => {
  res.status(200).json({
    login: 'reg'
  })
}

module.exports = {
  getByCategoryId,
  create,
  remove,
  update
}