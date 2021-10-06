const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Success delete',
  });
};

module.exports = removeContact;
