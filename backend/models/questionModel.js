const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answers: [
      {
        type: String,
        required: true,
      },
    ],
    correctAnswer: {
      type: Number,
      required: true,
    },
    points: {
      type: Number,
      required: true,
      max: 10,
      min: 1,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", QuestionSchema);
