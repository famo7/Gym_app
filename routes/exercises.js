const Exercise = require('../models/exercise');
const Workout = require('../models/workout');
const authorize = require("../middlewares/authorization");
const exerciseRouter = require("express").Router();



exerciseRouter.post("/", authorize, async (req, res) => {
  const body = req.body;

  const exercise = new Exercise({
    name: body.name,
  });

  const savedExercise = await exercise.save();
  const workout = await Workout.findById(body.workout)
  workout.exercises = workout.exercises.concat(savedExercise._id);
  await workout.save();
  res.status(201).json(savedExercise);
});

exerciseRouter.post("/getAllEx", authorize, async (req, res) => {
  const workout = await Workout.findById(req.body.workoutId)
   const ex = await (
     await workout.populate("exercises")
   ).populate("exercises.sets")
   const exercises = ex.exercises;
  res.json(exercises);
});


exerciseRouter.delete("/:id", authorize, async (req, res) => {
  await Exercise.findByIdAndRemove(req.params.id);
  res.status(204).end();
});


module.exports = exerciseRouter;
