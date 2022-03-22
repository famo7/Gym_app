require("dotenv").config();
const cors = require("cors");
const mongoose = require('mongoose');
const express = require("express");
const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const workoutRouter = require("./routes/workouts")
const setRouter = require("./routes/sets");
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use(cors())
app.use(express.json())

app.use("/api/exercises", exerciseRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/workouts", workoutRouter);
app.use("/api/sets", setRouter);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`gym app listening on port ${port}`);
});
