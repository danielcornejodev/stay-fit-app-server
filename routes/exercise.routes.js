const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise.model");

// CREATE
router.post("/", (req, res) => {
	Exercise.create(req.body)
		.then((exercise) => {
			res.json({ success: true, exercise });
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