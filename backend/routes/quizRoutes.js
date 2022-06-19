const express = require("express");
const {
  createQuestion,
  getAllQuestions,
  getQuizByCourseId,
  createQuizByCourseId,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/quizControllers");
const {
  protectMiddleware,
  isTeacher,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/:quizId/question")
  .get(protectMiddleware, isTeacher, getAllQuestions)
  .post(protectMiddleware, isTeacher, createQuestion);

router
  .route("/:quizId/question/:questionId")
  .put(protectMiddleware, isTeacher, updateQuestion)
  .delete(protectMiddleware, isTeacher, deleteQuestion);

router
  .route("/:courseId")
  .get(protectMiddleware, getQuizByCourseId)
  .post(protectMiddleware, isTeacher, createQuizByCourseId);

module.exports = router;
