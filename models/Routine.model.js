const { Schema, model } = require("mongoose");

const routineSchema = new Schema(
  {

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Routine = model("Routine", routineSchema);

module.exports = Routine;
