// const User = require("../models/user.js");


// // Middleware function to check if user is an admin

// exports.isAdmin=async(req, res, next) =>{
// try{
//     const { role } = req.body;
//     const user = await User.findOne({ role: role })
//     // Check if user is authenticated
//     // if (!req.User) {
//     //   return res.status(401).json({ message: "You need to be logged in to perform this action" });
//     // }
  
//     // Check if user has admin role
//     if (req.user !== "1") {
//       return res.status(403).json({ message: "You are not authorized to perform this action" });
//     }
  
//     // User is authenticated and has admin role, pass control to next middleware
//     next();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }}

const user = require("../models/user");

exports.admin  = async (req, res, next) => {
    if
       (  !req.user.isAdmin){
        return res.status(403).send("not admin");
    }
    next();
}