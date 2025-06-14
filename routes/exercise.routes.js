const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise.model");
const Workout = require('../models/Workout.model');


//CREATE and PUSH
//CREATE and PUSH
router.post("/workouts/:theID/exercises/create", (req, res) => {
	Exercise.create(req.body)
	.then((exercise)=>{
		Workout.findByIdAndUpdate(req.params.theID, 
			{$push: {exercises: exercise}}
		)
		.then((workout) => {
		//   req.flash('success', 'Workout Successfully Created')
			res.status(200).json({
				success: true,
				message: 'Exercise created and added to workout',
				exercises: workout.exercises, // send the updated list directly
			})
		})
		.catch((err) => {
			res.json({ success: false, error: err });
		});
	})
	.catch((err) => {
		res.json({ success: false, error: err });
	});
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

