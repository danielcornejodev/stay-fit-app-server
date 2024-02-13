const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
}).catch((err) => {
  console.error("An error occurred:", err);
  next(err); // Pass the error to the next error-handling middleware
});

module.exports = router;
