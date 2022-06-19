const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protectMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      //   decoding the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      // if token is expired
      if (error.name === "TokenExpiredError") {
        res.status(401);
        throw new Error("Token Expired!");
      }

      // if token is invalid
      if (error.name === "JsonWebTokenError") {
        res.status(401);
        throw new Error("Invalid Token!");
      }
    }
  }

  //   If no token
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized Access, No Token Provided!");
  }
});

// Teacher middleware
const isTeacher = (req, res, next) => {
  if (req.user && req.user.isTeacher) {
    next();
  } else {
    res.status(401);
    throw new Error("Unauthorized Access, You are not a teacher!");
  }
};

module.exports = { protectMiddleware, isTeacher };
