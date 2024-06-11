const express = require("express");
const app = express();
const path = require("path");
require("express-async-errors");
require("dotenv").config();
const morgan = require("morgan");
const port = process.env.PORT;
require("./db");
// ------------------------------------------------------------------------------

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// ------------------------------------------------------------------------------

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", require("./Routes/userRoutes"));
app.use("/api/todos", require("./Routes/todoRoutes"));
// ------------------------------------------------------------------------------

// Global Error Handling
app.use((err, req, res, next) => {
  // console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err?.message || "Something broke!";
  res.status(statusCode).send({
    statusCode,
    message,
    status: err.status || "error",
    errors: err?.errors || [],
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
