const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    });
    return;
  }

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    });
    return;
  }

  try {
    const { _id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findById(_id);
    if (!user.token) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    });
    return;
  }
};

module.exports = verifyToken;
