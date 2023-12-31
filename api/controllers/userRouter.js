const mongoose = require("mongoose");
const User = require("../models/usersSchema");
const { response } = require("../app");
const userRouter = require("express").Router();
const bcrypt = require("bcryptjs");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs");
  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Both username and password must be provided" });
  }

  // Check if username and password meet the length requirements
  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({
      error: "Username and password must be at least 3 characters long",
    });
  }

  const user = new User({
    username,
    name,
    passwordHash,
  });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
});
module.exports = userRouter;
