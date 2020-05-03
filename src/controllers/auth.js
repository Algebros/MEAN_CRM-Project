const login = (req, res) => {
  res.status(200).json({
    login: req.body
  })
}

const register = (req, res) => {
  res.status(200).json({
    login: req.body
  })
}

module.exports = {
  login,
  register
}