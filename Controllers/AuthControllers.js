const User = require("../Models/userModel");
const AppError = require("../Utils/AppError");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  user.password = undefined;
  res.send(user);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("Invalid email or password", 401));

  if (!(await user.isValidPassword(password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  user.password = undefined;

  const token = await jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.send({ user, token });
};

const getUser = async (req, res) => {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId });
  res.send(user);
};

module.exports = { signup, login, getUser };
