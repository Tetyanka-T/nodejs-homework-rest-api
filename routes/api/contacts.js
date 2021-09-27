const express = require('express');

const { contacts: ctrl } = require('../../controllers');
const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contacts');
const { controllerWrapper, validation } = require('../../middlewares');

const router = express.Router();

router.get('/', controllerWrapper(ctrl.listContacts));

router.get('/:contactId', controllerWrapper(ctrl.getContactById));

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact));

router.delete('/:contactId', controllerWrapper(ctrl.removeContact));

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
