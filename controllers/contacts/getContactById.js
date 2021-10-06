const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(
    contactId,
    '_id name email phone favorite'
  );
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getContactById;
