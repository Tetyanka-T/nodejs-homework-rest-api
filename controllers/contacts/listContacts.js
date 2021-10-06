const { Contact } = require('../../models');

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.find(
    { owner: _id },
    '_id name email phone favorite'
  );
  // const result = await Contact.find({}, '_id name email phone favorite');
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listContacts;
