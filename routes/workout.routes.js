const express = require("express");
const router = express.Router();
const Workout = require('../models/Workout.model');
const Exercise = require('../models/Exercise.model');
const User = require('../models/User.model');

// CREATE POST
router.post("/", (req, res) => {
	
	Workout.create(req.body)
		.then((workout) => {
			const userID = req.body.owner._id;
			User.findByIdAndUpdate(userID, {
				$push: {workouts: workout}
			  })
			  .then((user) => {
				res.json({ success: true, user });
			  }).catch((err) => {
				res.json({ success: false, error: err });
			});
		})
		.catch((err) => {
			res.json({ success: false, error: err });
		});
});

// READ
router.get("/:theID", (req, res) => {
	console.log(req.params.theID)
	User.findById(req.params.theID).populate("workouts")
	.then((theUser) =>{
		res.json({ success: true, theUser });
	})
	.catch((err) => {
		res.json({ success: false, error: err });
	});


	// Workout.find()
	// 	.then((workouts) => {
	// 		res.json({ success: true, workouts });
	// 	})
	// 	.catch((err) => {
	// 		res.json({ success: false, error: err });
	// 	});
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
