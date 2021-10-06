const { Contact } = require('../../models');

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id };
  const result = await Contact.create(newContact);
  // const result = await Contact.create(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
