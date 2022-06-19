import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../components/common/Button";
import Input from "../components/Input";
import { createCourse } from "../redux/actions/courseActions";
import { COURSE_CREATE_RESET } from "../redux/constants/courseConstants";

const CourseCreatePage = () => {
  const dispatch = useDispatch();

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseLevel, setCourseLevel] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createCourse(courseName, courseDescription, courseLevel));
  };

  const { error, success, course } = useSelector((state) => state.courseCreate);

  useEffect(() => {
    dispatch({ type: COURSE_CREATE_RESET });

    if (success) {
      setCourseName("");
      setCourseDescription("");
      setCourseLevel("");

      return toast.success(`Course ${course.courseName} created successfully!`);
    } else if (error) {
      return toast.error(error);
    }
  }, [dispatch, success, error, course]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-5 py-5 bg-gray-100">
      <div className="w-full max-w-md bg-white p-3 md:p-9 shadow-md rounded-xl">
        <form onSubmit={submitHandler} className="space-y-6">
          <Input
            label="Course Name*"
            placeholder="React"
            id="courseName"
            name="courseName"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />

          <Input
            label="Course Description*"
            placeholder="lorem ipsum dolor sit amet"
            id="courseDescription"
            name="courseDescription"
            type="text"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />

          <Input
            label="Course Level*"
            placeholder="Beginner,Intermediate,Advanced"
            id="courseLevel"
            name="courseLevel"
            type="text"
            value={courseLevel}
            onChange={(e) => setCourseLevel(e.target.value)}
          />

          <Button text="Create" />
        </form>
      </div>
    </div>
  );
};

export default CourseCreatePage;
