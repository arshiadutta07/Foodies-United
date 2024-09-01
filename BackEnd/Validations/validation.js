const Joi = require('joi');

const userSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  password: Joi.string()
  .pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
  .message('Password must contain at least one special character, one capital letter, and be between 8 and 30 characters long')
  .required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('SuperAdmin', 'Admin', 'Client').required()
});

const userCredentials = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  password: Joi.string().required()
})

const recipeSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10),
  instructions: Joi.string().min(10).required(),
  ingredients: Joi.string().required(),
  userId: Joi.string().guid({ version: 'uuidv4' }).required(),
  cuisineId: Joi.string().guid({ version: 'uuidv4' }).required()
});

const blogDetails = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  content: Joi.string().min(10).max(300).required(),
  userId: Joi.string().required(),
});

const emailVerifySchema = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.string().required()
});

module.exports = {
  userSchema,
  userCredentials,
  recipeSchema,
  emailVerifySchema
};