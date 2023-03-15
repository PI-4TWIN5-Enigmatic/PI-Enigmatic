
const jwt=require("jsonwebtoken");
const user = require("../models/user");


exports.verifyToken  = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    if (req.user.isBanned < new Date() || req.user.isBanned == null)
    {
      next();
    } else {
      res.status(401).send('user banned');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};