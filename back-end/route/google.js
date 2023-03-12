const express = require("express");
const router = express.Router();
const passport = require("passport");
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req);
    res.redirect(
      "http://localhost:3000"
    );
  }
);

module.exports = router;