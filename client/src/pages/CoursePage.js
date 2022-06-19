import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";
import { courseList } from "../redux/actions/courseActions";

const CoursePage = () => {
  const dispatch = useDispatch();

  const { loading, error, courses } = useSelector((state) => state.courseList);

  useEffect(() => {
    dispatch(courseList());
  }, [dispatch]);

  return (
    <>
      {error && (
        <div className="text-red-500 text-center">
          {error}, Try reloading the page again.
        </div>
      )}
      <h2 className="text-center mt-4 text-black font-semibold text-4xl">
        Courses
      </h2>

      {loading ? (
        <Loader />
      ) : (
        <section>
          <div className="relative items-center w-full px-3 py-8 mx-auto lg:px-24 max-w-7xl">
            <div className="grid w-full grid-cols-1 gap-12 mx-auto lg:grid-cols-3">
              {courses.length > 0 ? (
                courses.map((course) => <Card key={course._id} item={course} />)
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

export default CoursePage;
