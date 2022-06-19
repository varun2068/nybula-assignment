const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    minPoints: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", QuizSchema);
