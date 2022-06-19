import { Link } from "react-router-dom";
import Badge from "./Badge";

const Card = ({ item }) => {
  return (
    <div className="p-6 border-2 border-transparent rounded-lg shadow hover:border-blue-500">
      <h1 className="mx-auto mb-2 text-2xl font-medium leading-none tracking-tighter text-neutral-600 lg:text-3xl capitalize">
        {item.courseName}
      </h1>

      <p className="text-sm text-neutral-500 font-medium mb-2">
        Course by {item.courseInstructor.name}
      </p>

      {/* Badge */}
      <Badge badgeText={item.courseLevel} />

      {/* Course Description */}
      <p className="mx-auto text-base leading-relaxed text-gray-400">
        {item.courseDescription}
      </p>

      {/* Course Link */}
      <div className="mt-2">
        <Link
          to={`/course/${item._id}`}
          className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600"
        >
          View Course »
        </Link>
      </div>
    </div>
  );
};

export default Card;
