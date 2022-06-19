const asyncHandler = require("express-async-handler");
const Quiz = require("../models/quizModel");
const Question = require("../models/questionModel");
const Course = require("../models/courseModel");

// @desc Get all questions of a course quiz
// @route GET /v1/api/quizzes/:quizId/question
// @access Private
const getAllQuestions = asyncHandler(async (req, res) => {
  // Get all questions of the course
  const questions = await Question.find({ quizId: req.params.quizId });

  // Sending response
  if (questions) {
    res.json(questions);
  } else {
    res.status(401);
    throw new Error("Invalid course data!");
  }
});

// @desc Create a question
// @route POST /v1/api/quizzes/:quizId/question
// @access Private/Teacher
const createQuestion = asyncHandler(async (req, res) => {
  // Get the question from the request body
  const { question, answers, correctAnswer, points } = req.body;

  // Check if the question already exists
  const questionExists = await Question.findOne({ question });

  if (questionExists) {
    res.status(400);
    throw new Error("Question already exists!");
  }

  // Create the question
  const newQuestion = await Question.create({
    question,
    answers,
    correctAnswer,
    points,
    quizId: req.params.quizId,
  });

  // Save the question to the quiz
  await Quiz.findByIdAndUpdate(
    req.params.quizId,
    { $push: { questions: newQuestion._id } },
    { new: true }
  );

  // Sending response
  if (newQuestion) {
    res.status(201).json({
      question: {
        id: newQuestion._id,
        question: newQuestion.question,
        answers: newQuestion.answers,
        correctAnswer: newQuestion.correctAnswer,
        points: newQuestion.points,
        quizId: newQuestion.quizId,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid question data!");
  }
});

// @desc Update a question
// @route PUT /v1/api/quizzes/:quizId/question/:questionId
// @access Private/Teacher
const updateQuestion = asyncHandler(async (req, res) => {
  // Find the question by id
  const questions = await Question.findById(req.params.questionId);

  if (questions) {
    // Get the question from the request body
    const { question, answers, correctAnswer, points } = req.body;

    // Update the question
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.questionId,
      { $set: { question, answers, correctAnswer, points } },
      { new: true }
    );

    // Sending updated response
    res.json(updatedQuestion);
  } else {
    res.status(404);
    throw new Error("Question not found!");
  }
});

// @desc Delete a question
// @route DELETE /v1/api/quizzes/:quizId/question/:questionId
// @access Private/Teacher
const deleteQuestion = asyncHandler(async (req, res) => {
  // Find the question by id
  const question = await Question.findById(req.params.questionId);

  if (question) {
    // Delete the question
    await question.remove();

    // Delete question from quiz
    await Quiz.findByIdAndUpdate(
      req.params.quizId,
      { $pull: { questions: req.params.questionId } },
      { new: true }
    );

    // Sending response
    res.json({ message: "Question deleted successfully!" });
  } else {
    res.status(404);
    throw new Error("Question not found!");
  }
});

// @desc Get quiz by course id
// @route GET /v1/api/quizzes/:courseId
// @access Private
const getQuizByCourseId = asyncHandler(async (req, res) => {
  // Fetch quiz by course id
  const quiz = await Quiz.find({ courseId: req.params.courseId });

  // Check if quiz exists
  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found!");
  }

  // Send quiz
  res.json(quiz);
});

// @desc Create quiz by course id
// @route POST /v1/api/quizzes/:courseId
// @access Private/Teacher
const createQuizByCourseId = asyncHandler(async (req, res) => {
  // Find course by id
  const course = await Course.findById(req.params.courseId);

  // Check if course exists
  if (!course) {
    res.status(404);
    throw new Error("Course not found!");
  }

  // Check if course quiz exists
  const quizExists = await Quiz.findOne({ courseId: req.params.courseId });

  if (quizExists) {
    res.status(400);
    throw new Error("Quiz already exists, You can't create a new quiz!");
  }

  // Get quiz data from request body
  const { name, minPoints, time, questions } = req.body;

  // Create quiz
  const newQuiz = await Quiz.create({
    name,
    minPoints,
    time,
    questions,
    courseId: course._id,
  });

  // Send response
  if (newQuiz) {
    res.status(201).json({
      quiz: {
        id: newQuiz._id,
        name: newQuiz.name,
        minPoints: newQuiz.minPoints,
        time: newQuiz.time,
        questions: newQuiz.questions,
        courseId: newQuiz.courseId,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid quiz data!");
  }
});

module.exports = {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuizByCourseId,
  createQuizByCourseId,
};
