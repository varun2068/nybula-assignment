const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");

// @desc    Fetch all courses
// @route   GET /v1/api/courses
// @access  Private
const getCourses = asyncHandler(async (req, res) => {
  // find all courses and populate the teacher and sort by updatedAt
  const courses = await Course.find({})
    .populate("courseInstructor", "name")
    .sort({ updatedAt: -1 });

  res.json(courses);
});

// @desc   Fetch a single course by id
// @route   GET /v1/api/courses/:id
// @access Private
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate(
    "courseInstructor",
    "name"
  );

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error("Course not found!");
  }
});

// @desc   Create a course
// @route   POST /v1/api/courses
// @access Private/Teacher
const createCourse = asyncHandler(async (req, res) => {
  // Get the course data from the request body
  const { courseName, courseDescription, courseLevel } = req.body;

  const course = await Course.create({
    courseInstructor: req.user.id,
    courseName,
    courseDescription,
    courseLevel,
  });

  // Sending response
  if (course) {
    res.status(201).json(course);
  } else {
    res.status(401);
    throw new Error("Invalid course data!");
  }
});

// @desc   Update a course
// @route   PUT /v1/api/courses/:id
// @access Private/Teacher
const updateCourse = asyncHandler(async (req, res) => {
  // Get the course data from the request body
  const { courseName, courseDescription, courseLevel } = req.body;

  // Find the course by id
  const course = await Course.findById(req.params.id);

  if (course) {
    course.courseName = courseName;
    course.courseDescription = courseDescription;
    course.courseLevel = courseLevel;

    // Save the course
    const updatedCourse = await course.save();

    // Sending updated response
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error("Course not found!");
  }
});

// @desc   Delete a course
// @route   DELETE /v1/api/courses/:id
// @access Private/Teacher
const deleteCourse = asyncHandler(async (req, res) => {
  // Find the course by id
  const course = await Course.findById(req.params.id);

  if (course) {
    await course.remove();
    res.json({ message: "Course deleted successfully!" });
  } else {
    res.status(404);
    throw new Error("Course not found!");
  }
});

// @desc  Fetch all courses by a teacher
// @route  GET /v1/api/courses/teacher/:id
// @access Private/Teacher
const getCoursesByTeacher = asyncHandler(async (req, res) => {
  // Find the course by id
  const courses = await Course.find({ courseInstructor: req.params.id });

  if (courses) {
    res.json(courses);
  } else {
    res.status(404);
    throw new Error("No courses found!");
  }
});

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesByTeacher,
};
