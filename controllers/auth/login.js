const { Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../../models');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, '_id, email, password');
  // const correctPassword = bcrypt.compareSync(password, user.password);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Unauthorized('Email or password is wrong');
  }
  const { _id } = user;
  const payload = { _id };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate({ _id }, { token });
  res.json({
    status: 'success',
    code: 200,
    token,
  });
};

module.exports = login;
