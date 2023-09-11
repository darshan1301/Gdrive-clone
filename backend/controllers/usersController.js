const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const Folder = require("../models/foldersModel");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const userSignup = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, country, state, city, password } =
    req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Country: country,
      State: state,
      City: city,
      Password: hashedPassword,
    });

    await newUser.save();

    const rootDirectory = "./filesio";
    
    if (!fs.existsSync(rootDirectory)) {
      fs.mkdirSync(rootDirectory);
      console.log(`Created directory: ${rootDirectory}`);
    }

      const defaultFolder = new Folder({
        name: "documents",
        user: newUser._id, 
      });

      await defaultFolder.save();
    
    const tokenPayload = {
      userId: newUser._id,
      email: newUser.Email,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token: token });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).send("Error during user registration");
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ Email: email });

    if (!user) {
      console.log(user + " not found");
      return res
        .status(404)
        .send(user + "User not found. Please check your email and try again.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.Password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid password. Please try again." });
    }

    const tokenPayload = {
      userId: user._id,
      email: user.Email,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    res.status(200).json({ token: token, userId: user._id });
  } catch (error) {
    console.error("Error during user login:", error);
  }
};

module.exports = { userLogin, userSignup };
