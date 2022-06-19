const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const db = require("./config/db");
const PORT = process.env.PORT || 5000;

const { handleError, notFound } = require("./middlewares/errorMiddleware");

// configure .env file
dotenv.config();

// connect to database
db();

// Initialize the app
const app = express();

// API Security
app.use(helmet());

// log all API requests to the console
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/v1/api/auth", require("./routes/userRoutes"));
app.use("/v1/api/courses", require("./routes/courseRoutes"));
app.use("/v1/api/quizzes", require("./routes/quizRoutes"));

// --------------------Deployment-----------------------------------------------------
// Serving Frontend Files
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to the ALP API" });
  });
}

// Handle errors
app.use(handleError);
app.use(notFound);

// listen to port 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
