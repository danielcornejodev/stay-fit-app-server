const express = require("express");
const router = express.Router();
const Workout = require('../models/Workout.model');
const Exercise = require('../models/Exercise.model');
const User = require('../models/User.model');

// CREATE POST
router.post("/", async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    const userID = req.body.owner._id;
    const user = await User.findByIdAndUpdate(userID, {
      $push: { workouts: workout }
    });
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// READ Find user first and then populate all workouts for the user
router.get("/:theID", async (req, res) => {
  try {
    console.log(req.params.theID);
    const theUser = await User.findById(req.params.theID).populate("workouts");
    res.json({ success: true, theUser });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// READ
router.get("/workout/:workoutId", async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.workoutId).populate('exercises');
    res.json({ success: true, workout });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// UPDATE
router.put("/:workoutId", async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.workoutId, req.body, { new: true });
    res.json({ success: true, workout });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// DELETE
router.delete("/:workoutId/:userId", async (req, res) => {
  const workoutId = req.params.workoutId;
  const userId = req.params.userId;

  try {
    // Delete the exercises
    const workout = await Workout.findById(workoutId);
    console.log('Exercises Array', workout.exercises);
    for (const exerciseId of workout.exercises) {
      await Exercise.findByIdAndRemove(exerciseId);
    }
    console.log("Deleted exercises");

    // Delete the workout itself
    const deleteWorkoutResult = await Workout.findByIdAndRemove(workoutId);
    console.log("Deleted workout:", deleteWorkoutResult);

    // Update user's workouts
    const updateUserResult = await User.updateOne(
      { _id: userId },
      {
        $pull: { workouts: workoutId }
      }
    );
    console.log("Updated user:", updateUserResult);

    res.json({ success: true, message: "Successfully removed Workout and associated Exercises" });
  } catch (err) {
    console.error("Error:", err);
    res.json({ success: false, error: err });
  }
});

module.exports = router;
