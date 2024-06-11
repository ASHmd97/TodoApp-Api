const express = require("express");
const router = express.Router();
const { verifyToken, todoValidation } = require("../Utils/validation");
const {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../Controllers/TodoControllers");

router.get("/", verifyToken, getAllTodos);

router.get("/:id", verifyToken, getTodo);

router.post("/", todoValidation, verifyToken, createTodo);

router.patch("/:id", todoValidation, verifyToken, updateTodo);

router.delete("/:id", verifyToken, deleteTodo);

module.exports = router;
