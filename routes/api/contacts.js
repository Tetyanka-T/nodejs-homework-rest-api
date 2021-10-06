const express = require('express');

const { contacts: ctrl } = require('../../controllers');
const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contacts');
const {
  controllerWrapper,
  validation,
  verifyToken,
} = require('../../middlewares');

const router = express.Router();

router.get('/', verifyToken, controllerWrapper(ctrl.listContacts));

router.get('/:contactId', verifyToken, controllerWrapper(ctrl.getContactById));

router.post(
  '/',
  verifyToken,
  validation(joiSchema),
  controllerWrapper(ctrl.addContact)
);

router.delete(
  '/:contactId',
  verifyToken,
  controllerWrapper(ctrl.removeContact)
);

router.put(
  '/:contactId',
  validation(joiSchema),
  controllerWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/favorite',
  validation(updateFavoriteJoiSchema),
  controllerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
