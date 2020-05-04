const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const login = async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.body.email });
    if(candidate) {
      const isPassword = await candidate.comparePassword(req.body.password);
      if(isPassword) {
        const token = jwt.sign({
          userId: candidate._id,
          email: candidate.email
        }, SECRET_KEY, {expiresIn: "1h"});
        res.status(200).json({ token: `Bearer ${token}` });
      } else {
        res.status(401).json({
          message: 'Password incorrect'
        });
      };
    } else {
      res.status(404).json({
        message: 'Not Found'
      });
    }
  } catch (error) {
    console.log(error)
  }
}

const register = async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.body.email });
    if(candidate) {
      res.status(409).json({
        message: 'That email has been existing'
      });
      return;
    }
    const user = await User.create({
      email: req.body.email,
      password: req.body.password
    });
    res.status(201).json({
      message: 'Created'
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  login,
  register
}