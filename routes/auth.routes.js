const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;

  if (email === "" || password === "" || name === "") {
    return res.status(400).json({ message: "Provide email, password and name" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Provide a valid email address." });
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const createdUser = await User.create({ email, password: hashedPassword, name });
    const { _id } = createdUser;
    const user = { email, name, _id };

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return res.status(400).json({ message: "Provide email and password." });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: "User not found." });
    }

    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (passwordCorrect) {
      const { _id, email, name } = foundUser;
      const payload = { _id, email, name };

      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      res.status(200).json({ authToken });
    } else {
      res.status(401).json({ message: "Unable to authenticate the user" });
    }
  } catch (err) {
    next(err);
  }
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;
