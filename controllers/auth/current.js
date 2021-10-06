const { User } = require('../../models');

const current = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id, '_id email subscription');

  res.json({
    status: 'success',
    code: 200,
    user,
  });
};

module.exports = current;
