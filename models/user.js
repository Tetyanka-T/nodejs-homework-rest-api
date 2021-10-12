const { Schema, model } = require('mongoose');
const gravatar = require('gravatar');
const Joi = require('joi');

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: 250 }, true);
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  email: Joi.string().min(1).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
  avatar: Joi.string(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiSchema,
};
