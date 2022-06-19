const express = require("express");
const {
  getCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByTeacher,
} = require("../controllers/courseControllers");
const {
  protectMiddleware,
  isTeacher,
} = require("../middlewares/authMiddleware");
const {
  validateCourseData,
  validationCheck,
} = require("../helpers/validation");
const router = express.Router();

router
  .route("/")
  .get(protectMiddleware, getCourses)
  .post(
    protectMiddleware,
    isTeacher,
    validateCourseData,
    validationCheck,
    createCourse
  );
router
  .route("/:id")
  .get(protectMiddleware, getCourseById)
  .put(protectMiddleware, isTeacher, updateCourse)
  .delete(protectMiddleware, isTeacher, deleteCourse);
router
  .route("/teacher/:id")
  .get(protectMiddleware, isTeacher, getCoursesByTeacher);

module.exports = router;
