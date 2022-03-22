const Sett = require("../models/set");
const Exercise = require("../models/exercise");

const authorize = require("../middlewares/authorization");
const setRouter = require("express").Router();



setRouter.post("/", authorize, async (req, res) => {
  const body = req.body;

  const set = new Sett({
    reps: body.reps,
    weight: body.weight,
  });

  set.exercise = body.exercise;
  const savedSet = await set.save();
  const exercise = await Exercise.findById(body.exercise);
  exercise.sets = exercise.sets.concat(savedSet._id);
  await exercise.save();
  res.status(201).json(savedSet);
});


setRouter.get("/:id", authorize, async (req, res) => {
  const sets = await Sett.find({exercise:req.params.id}).sort({createdAt: -1});


  res.json(sets);
});



module.exports = setRouter;
