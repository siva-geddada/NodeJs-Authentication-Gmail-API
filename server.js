require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const connectDB = require("./config/db");
const createError = require("http-errors");
const authRoute = require("./Routes/Auth.route");

connectDB();
const app = express();
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", async (req, res, next) => {
  res.send(" APP Works");
});

app.use("/auth", authRoute);

app.use(async (req, res, next) => {
  // const error = new Error("Not Found")
  // error.status = 404
  // next(error)
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
