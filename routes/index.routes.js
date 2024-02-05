const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
  res.send("Express on Vercel");
});

module.exports = router;
