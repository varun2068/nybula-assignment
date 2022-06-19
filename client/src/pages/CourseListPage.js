import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import {
  deleteCourse,
  getCourseByTeacherId,
} from "../redux/actions/courseActions";
import CourseCard from "../components/Teacher/CourseCard";
import { toast } from "react-toastify";
import { COURSE_DELETE_RESET } from "../redux/constants/courseConstants";

const CourseListPage = () => {
  const dispatch = useDispatch();

  const { loading, error, courses } = useSelector(
    (state) => state.teacherCourseList
  );

  const {
    error: errorDelete,
    success,
    message,
  } = useSelector((state) => state.courseDelete);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch({ type: COURSE_DELETE_RESET });
    dispatch(getCourseByTeacherId(userInfo.id));

    if (errorDelete) return toast.error(errorDelete);
    if (success) return toast.success(message);
  }, [dispatch, userInfo, errorDelete, success, message]);

  const deleteHandler = (id) => {
    dispatch(deleteCourse(id));
  };

  return (
    <>
      <h2 className="text-center mt-4 text-black font-semibold text-4xl">
        My Courses
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
              {courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard
                    key={course._id}
                    item={course}
                    onClick={() => deleteHandler(course._id)}
                  />
                ))
              ) : (
                <div className="text-center text-2xl mt-24">
                  No Courses Found!
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CourseListPage;
