const { Schema, model } = require("mongoose");

const workoutSchema = new Schema(
  {
    date: Date,
    exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}],
    apiExercises: [String] //pass in id's from API
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
