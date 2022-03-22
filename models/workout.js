const mongoose = require("mongoose");
const workoutSchema = new mongoose.Schema({
  name: String,
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

workoutSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
