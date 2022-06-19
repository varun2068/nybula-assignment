import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import QuizCard from "../components/Teacher/QuizCard";
import { getCourseQuizByCourseId } from "../redux/actions/courseActions";

const CourseDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, quizzes } = useSelector((state) => state.courseQuiz);

  useEffect(() => {
    dispatch(getCourseQuizByCourseId(id));
  }, []);

  return (
    <>
      <h2 className="text-center mt-4 text-black font-semibold text-4xl">
        Quizzes
      </h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500 text-center">
          {error}, Try reloading the page again.
        </div>
      ) : (
        <section>
          <div className="relative items-center w-full px-3 py-8 mx-auto lg:px-24 max-w-7xl">
            <div className="grid w-full grid-cols-1 gap-12 mx-auto lg:grid-cols-3">
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => <QuizCard key={quiz._id} item={quiz} />)
              ) : (
                <div className="text-center text-2xl mt-24">No Quiz Found!</div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default CourseDetailPage;
