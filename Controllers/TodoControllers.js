const AppError = require("../Utils/AppError");
const Todo = require("../Models/todoModel");

const getAllTodos = async (req, res) => {
  const userId = req.user._id;
  const todos = await Todo.find({ user: userId }).populate("user");
  res.send(todos);
};

const getTodo = async (req, res, next) => {
  const userId = req.user._id;
  const todoId = req.params.id;
  const todo = await Todo.findOne({ _id: todoId }).populate("user");
  if (!todo) return next(new AppError("Todo not found", 404));
  if (todo.user._id != userId) return next(new AppError("Unauthorized", 401));
  res.send(todo);
};

const createTodo = async (req, res) => {
  const userId = req.user._id;
  const { title } = req.body;
  const todo = new Todo({ title, user: userId });
  await todo.save();
  res.send(todo);
};

const updateTodo = async (req, res, next) => {
  const userId = req.user._id;
  const todoId = req.params.id;
  let todo = await Todo.findById(todoId);
  if (!todo) return next(new AppError("Todo not found", 404));
  if (todo.user != userId) return next(new AppError("Unauthorized", 401));
  console.log(req.body);
  if (!req.body.title) req.body.title = todo.title;
  console.log(req.body);

  todo = await Todo.findByIdAndUpdate(todoId, req.body);
  res.send(todo);
};

const deleteTodo = async (req, res, next) => {
  const userId = req.user._id;
  const todoId = req.params.id;
  let todo = await Todo.findById(todoId);
  if (!todo) return next(new AppError("Todo not found", 404));
  if (todo.user != userId) return next(new AppError("Unauthorized", 401));
  todo = await Todo.findByIdAndDelete(req.params.id);
  res.send(todo);
};

module.exports = { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo };
