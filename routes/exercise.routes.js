const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise.model");
const Workout = require('../models/Workout.model');


//CREATE and PUSH
router.post("/workouts/:theID/exercises/create", (req, res) => {
	console.log(req.body)
	const { selectedExercise, formData } = req.body;


  
	if (selectedExercise) {
		const temporaryId = selectedExercise._id;
    
		// Create a new exercise document with the temporary ID
		Exercise.create({ ...selectedExercise, _id: temporaryId })
		  .then((exercise) => {
			const actualId = exercise._id; // The actual ID assigned by the database
			
			// Now exercise has an actual ID in the database
			// You can update any references to the temporary ID with the actual ID if needed
			// For example, update the exercise in the workout with the actual ID
			Workout.findOneAndUpdate(
			  { _id: req.params.theID, "exercises._id": temporaryId },
			  { $set: { "exercises.$._id": actualId } },
			  { new: true }
			)
			.then((workout) => {
			  res.json({ success: true, workout });
			})
			.catch((err) => {
			  res.json({ success: false, error: err });
			});
		  })
		  .catch((err) => {
			res.json({ success: false, error: err });
		  });
	} else if (formData) {
	  // If no suggested exercise is selected, create a new exercise
	  Exercise.create(formData)
		.then((exercise) => {
		  Workout.findByIdAndUpdate(
			req.params.theID,
			{ $push: { exercises: exercise } }
		  )
			.then((workout) => {
			  res.json({ success: true, workout });
			})
			.catch((err) => {
			  res.json({ success: false, error: err });
			});
		})
		.catch((err) => {
		  res.json({ success: false, error: err });
		});
	} else {
		res.json({ success: false, error: "No exercise data provided." });
	  }
  });
  




// READ
router.get("/", (req, res) => {
	Exercise.find()
		.then((exercises) => {
			res.json({ success: true, exercises });
		})
		.catch((err) => {
			res.json({ success: false, error: err });
		});
});

// READ
router.get("/:exerciseId", (req, res) => {
	Exercise.findById(req.params.exerciseId)
		.then((exercise) => {
			res.json({ success: true, exercise });
		})
		.catch((err) => {
			res.json({ success: false, error: err });
		});
});

// UPDATE
router.put("/:exerciseId", (req, res) => {
	Exercise.findByIdAndUpdate(req.params.exerciseId, req.body, { new: true })
		.then((exercise) => {
			res.json({ success: true, exercise });
		})
		.catch((err) => {
			res.json({ success: false, error: err });
		});
});

// DELETE
router.delete("/:exerciseId", (req, res) => {
	Exercise.findByIdAndRemove(req.params.exerciseId)
		.then(() => {
			res.json({ success: true, message: "Successfully removed Exercise" });
		})
		.catch((err) => {
			res.json({ success: false, error: err });
		});
});

module.exports = router;