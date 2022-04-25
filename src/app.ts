const path = require("path");
import { Request, Response, NextFunction } from "express";
import { Err } from "./helpers";
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const router = require("./todos/todos.router");

let app = express();

app.use(cors());
app.use(express.json());

app.use("/todos", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
});

app.use((error: Err, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
