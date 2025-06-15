const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise.model");
const Workout = require('../models/Workout.model');


// CREATE and PUSH
router.post("/workouts/:theID/exercises/create", async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);
    const workout = await Workout.findByIdAndUpdate(
      req.params.theID,
      { $push: { exercises: exercise } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'Exercise created and added to workout',
      exercises: workout.exercises,
    });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// READ all exercises
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json({ success: true, exercises });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// READ one exercise
router.get("/:exerciseId", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.exerciseId);
    res.json({ success: true, exercise });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// UPDATE
router.put("/:exerciseId", async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.exerciseId,
      req.body,
      { new: true }
    );
    res.json({ success: true, exercise });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

// DELETE
router.delete("/:exerciseId", async (req, res) => {
  try {
    await Exercise.findByIdAndRemove(req.params.exerciseId);
    res.json({ success: true, message: "Successfully removed Exercise" });
  } catch (err) {
    res.json({ success: false, error: err });
  }
});

module.exports = router;

