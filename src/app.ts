const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

router = require("./todos/todos.router");

let app = express();

app.use(cors());
app.use(express.json());

app.use("/data", router);

app.use((req: any, res: any, next: any) => {
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
});

app.use((error: any, req: any, res: any, next: any) => {
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
