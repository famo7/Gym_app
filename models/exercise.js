const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: String,
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Set",
    },
  ],
});

exerciseSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
