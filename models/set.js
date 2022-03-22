const mongoose = require("mongoose");

const setSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
  },
  reps: Number,
  weight: Number,
}, {timestamps:true});

setSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Set", setSchema);


