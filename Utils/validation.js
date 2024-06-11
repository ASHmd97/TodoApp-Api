const Joi = require("joi");
const AppError = require("./appError");
const jwt = require("jsonwebtoken");

require('dotenv').config()
// console.log(process.env) // remove this after you've confirmed it is working

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(3).max(30).required(),
  email: Joi.string().email(),
  //   repeat_password: Joi.ref("password"),
  //   access_token: [Joi.string(), Joi.number()],
  //   birth_year: Joi.number().integer().min(1900).max(2013),
});

const loginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(3).max(30).required(),
});

const todoSchema = Joi.object({
  title: Joi.string().min(10).max(60),
  status: Joi.string().valid("todo", "inprogress", "completed"),
});

const registerValidation = async (req, res, next) => {
  try {
    const { error } = await registerSchema.validateAsync(req.body);
    if (error) throw error;
    next();
  } catch (error) {
    next(new AppError(error.message, 401, error.details));
  }
};

const loginValidation = async (req, res, next) => {
  try {
    const { error } = await loginSchema.validateAsync(req.body);
    if (error) throw error;
    next();
  } catch (error) {
    next(new AppError(error.message, 401, error.details));
  }
};

const todoValidation = async (req, res, next) => {
  try {
    const { error } = await todoSchema.validateAsync(req.body);
    if (error) throw error;
    next();
  } catch (error) {
    next(new AppError(error.message, 401, error.details));
  }
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("please provide a token", 403));

  await jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) return next(new AppError(err.message, 403));
    const user = decoded;
    req.user = user.user;
    next();
  });
};

module.exports = { registerValidation, loginValidation, todoValidation, verifyToken };