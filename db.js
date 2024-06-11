const mongoose = require("mongoose");
require("dotenv").config();

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qtkvrua.mongodb.net/`
  );
  console.log("Connected successfully to the database");
}

main().catch((err) => console.log(err));