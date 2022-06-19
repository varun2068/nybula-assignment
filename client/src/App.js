import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import CoursePage from "./pages/CoursePage";
import Navbar from "./components/common/Navbar";
import NotFound from "./pages/NotFound";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseCreatePage from "./pages/CourseCreatePage";
import CourseListPage from "./pages/CourseListPage";
import CourseEditPage from "./pages/CourseEditPage";
import CreateQuiz from "./pages/CreateQuiz";
import QuizCreatePage from "./pages/QuizCreatePage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Protected Routes */}
        <Route element={<Auth />}>
          <Route path="/" element={<CoursePage />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/course/create" element={<CourseCreatePage />} />
          <Route path="/course/list" element={<CourseListPage />} />
          <Route path="/course/edit/:id" element={<CourseEditPage />} />
          <Route path="/course/quiz/create/:id" element={<CreateQuiz />} />
          <Route path="/course/quiz/create/:id/question" element={<QuizCreatePage/>} />
        </Route>

        {/* Public Routes */}
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
