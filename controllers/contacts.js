const { NotFound } = require('http-errors');
const { Contact } = require('../models');

const listContacts = async (req, res) => {
  const result = await Contact.find({}, '_id name email phone favorite');
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

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

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

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

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
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

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
  updateStatusContact,
};
