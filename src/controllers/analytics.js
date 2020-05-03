const overview = (req, res) => {
  res.status(200).json({
    login: 'login'
  })
}

const analytics = (req, res) => {
  res.status(200).json({
    login: 'reg'
  })
}

module.exports = {
  overview,
  analytics
}