const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');

const { User } = require('../../models');

const signup = async (req, res) => {
  const { email, password, avatar } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Already register');
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = { email, avatar, password: hashPassword };
  await User.create(newUser);
  res.status(201).json({
    status: 'success',
    code: 201,
    // message: 'Success register',
    data: { email, avatar },
  });
};

module.exports = signup;
