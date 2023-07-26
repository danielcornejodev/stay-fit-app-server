const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema(
  {
    name: String,
    type: String,
    muscle: String,
    equipment: String,
    difficulty: String,
    instructions: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
