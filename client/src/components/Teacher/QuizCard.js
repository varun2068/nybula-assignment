import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const QuizCard = ({ item }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <div className="p-6 border-2 border-transparent rounded-lg shadow hover:border-blue-500">
      <h1 className="mx-auto mb-2 text-2xl font-medium leading-none tracking-tighter text-neutral-600 lg:text-3xl capitalize">
        {item.name}
      </h1>

      <p className="text-sm text-neutral-600 font-medium mb-2">
        {item.time} minutes
      </p>

      <p className="mx-auto text-base leading-relaxed text-gray-400">
        Total Questions: {item.questions.length}
      </p>

      {/* Minimum Points */}
      <p className="mx-auto text-base leading-relaxed text-gray-400">
        Minimum Points: {item.minPoints}
      </p>

      {/* Add question*/}
      {userInfo && userInfo.isTeacher && (
        <div className="mt-2">
          <Link
            to={`/quiz/add/${item._id}`}
            className="inline-flex items-center mt-2 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600"
          >
            Add Questions
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
