const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const generateToken = require("../util/generateToken.js");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  const saltRounds = 10;
  try {
    if (userExists) {
      res.status(400);
      throw new Error("User Already Exists.");
    } else {
      bcrypt.hash(password, saltRounds, async (hashError, hash) => {
        hashedPassword = hash;
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
          pic,
        });

        if (user) {
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
          });
        } else {
          res.status(400);
          throw new Error("Error occured while creating user.");
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // console.log(user);
  if (user === null) {
    res.status(404);
    throw new Error("Invalid email.");
  }

  const isUser = () => {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          pic: user.pic,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid email or password.");
      }
    });
  };

  isUser();
  // console.log(isUser);
  // if (user && (await user.matchPassword(password))) {
  // if (user && isUser) {
  //   res.json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     isAdmin: user.isAdmin,
  //     pic: user.pic,
  //     token: generateToken(user._id),
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error("Invalid email or password.");
  // }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };
