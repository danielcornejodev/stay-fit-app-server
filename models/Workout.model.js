const { Schema, model } = require("mongoose");

const workoutSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId, 
      ref: 'User'
    },
    date: Date,
    exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);


const Workout = model("Workout", workoutSchema);

module.exports = Workout;
