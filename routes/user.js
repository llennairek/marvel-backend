//packages import
const router = require("express").Router();
const encBase64 = require("crypto-js/enc-base64");
const sha256 = require("crypto-js/sha256");
const uid2 = require("uid2");

//model import
const User = require("../models/User");

router.get("/", async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const user = await User.findOne({ token });
    if (user) {
      res.status(200).json({
        favorites: user.favorites,
        username: user.username,
        _id: user._id,
      });
    } else {
      res.status(400).json({ error: "token unknown" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { favorites } = req.fields;

    const user = await User.findOne({ _id });
    user.favorites = favorites;
    await user.save();

    res.status(200).json({ message: "user updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.fields;
    const exist = await User.findOne({ email });
    if (!exist && username) {
      //build token and hash
      const token = uid2(64);
      const salt = uid2(16);
      const hash = sha256(salt + password).toString(encBase64);

      //build new user
      const newUser = new User({
        email,
        username,
        password,
        token,
        hash,
        salt,
      });

      //save new user in database
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        token,
        username,
        favorites: newUser.favorites,
      });
    } else if (exist) {
      res
        .status(400)
        .json({ message: `The email ${email} already exists in the database` });
    } else if (!username) {
      res.status(400).json({ message: "you can not have an empty usermane" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.fields;
    const user = await User.findOne({ email });
    if (user) {
      const newHash = sha256(user.salt + password).toString(encBase64);
      if (newHash === user.hash) {
        res.status(200).json({
          _id: user._id,
          token: user.token,
          username: user.username,
          favorites: user.favorites,
        });
      } else {
        res.status(400).json({
          message: "Wrong email and/or wrong password, please try again",
        });
      }
    } else {
      res.status(400).json({
        message: "Wrong email and/or wrong password, please try again",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
