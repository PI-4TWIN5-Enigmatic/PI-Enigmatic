const express = require("express");
const router = express.Router();
const passport = require("passport");

const jwt=require("jsonwebtoken")

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000",
  }),
  function (req, res) {
    console.log("🚀 ~ file: google.js:18 ~ req:", req)
    const payload = {
      userId: req.user._id, // replace with the user ID property on your user object
      email: req.email, // replace with the email property on your user object
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.redirect(`http://localhost:3000/?token=${token}&userId=${payload.userId}`);
  }
    // Successful authentication, redirect home.
    
    );
  


module.exports = router;