const express = require('express');
const { auth: ctrl } = require('../../controllers');
const { joiSchema } = require('../../models/user');
const {
  controllerWrapper,
  validation,
  verifyToken,
  upload,
} = require('../../middlewares');

const router = express.Router();

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup));

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login));

router.get('/logout', verifyToken, controllerWrapper(ctrl.logout));
router.get('/current', verifyToken, controllerWrapper(ctrl.current));
router.patch(
  '/avatars',
  verifyToken,
  upload.single('avatar'),
  controllerWrapper(ctrl.avatars)
);

module.exports = router;
