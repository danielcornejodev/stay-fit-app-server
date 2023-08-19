const express = require("express");
const router = express.Router();
const Workout = require('../models/Workout.model');
const Exercise = require('../models/Exercise.model')

// CREATE POST
router.post("/", (req, res) => {
	Workout.create(req.body)
		.then((workout) => {
			res.json({ success: true, workout });
		})
		.catch((err) => {
			res.json({ success: false, error: err });
		});
});

// READ
router.get("/", (req, res) => {
	Workout.find()
		.then((workouts) => {
			res.json({ success: true, workouts });
		})
		.catch((err) => {
			res.json({ success: false, error: err });
		});
});

// READ
router.get("/:workoutId", (req, res) => {
	Workout.findById(req.params.workoutId).populate('exercises') //need to populate apiAexercises also
		.then((workout) => {
			res.json({ success: true, workout });
		})
		.catch((err) => {
			res.json({ success: false, error: err });
		});
});

// UPDATE
router.put("/:workoutId", (req, res) => {
	Workout.findByIdAndUpdate(req.params.workoutId, req.body, { new: true })
		.then((workout) => {
			res.json({ success: true, workout });
		})
		.catch((err) => {
			res.json({ success: false, error: err });
		});
});

// DELETE
router.delete("/:workoutId", (req, res) => {
	const workoutId = req.params.workoutId;
  
	// First, delete the workout itself
	Workout.findByIdAndRemove(workoutId)
	  .then(() => {
		// Now, find and delete associated exercises
		Exercise.deleteMany({ workout: workoutId })
		  .then(() => {
			res.json({ success: true, message: "Successfully removed Workout and associated Exercises" });
		  })
		  .catch((err) => {
			res.json({ success: false, error: err });
		  });
	  })
	  .catch((err) => {
		res.json({ success: false, error: err });
	  });
  });
  

module.exports = router;
