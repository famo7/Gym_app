const Workout = require("../models/workout");
const authorize = require("../middlewares/authorization");
const getUser = require("../utils/userUtil")
const workoutRouter = require("express").Router();



workoutRouter.get("/",  authorize, async (req, res) =>{
  const user = await getUser(req.token);
  const workouts = await (
    await (await user.populate("workouts")).populate("workouts.exercises")
  ).populate("workouts.exercises.sets");
  res.json(workouts)
})


workoutRouter.post("/", authorize, async (req, res) =>{
   const body = req.body;
   const user = await getUser(req.token);

   const workout = new Workout({
     name: body.name,
     user: user._id,
   });

   const savedWorkout = await workout.save();
   user.workouts = user.workouts.concat(savedWorkout._id);
   try {
     await user.save();
   } catch (error) {
     console.log(error);
     
   }
   res.status(201).json(savedWorkout);
})

workoutRouter.put("/:id", async (req, res) => {
  await Workout.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name },
    { new: true }
  );
});


workoutRouter.delete("/:id", async (req, res) => {
  await Workout.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

workoutRouter.get("/:id", async (req, res) => {
  const workout = await Workout.findById(req.params.id).populate("exercises")
  res.json(workout)
});

module.exports = workoutRouter;
