import {
  COURSE_CREATE_ERROR,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_RESET,
  COURSE_CREATE_SUCCESS,
  COURSE_DELETE_ERROR,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_RESET,
  COURSE_DELETE_SUCCESS,
  COURSE_GET_ERROR,
  COURSE_GET_REQUEST,
  COURSE_GET_SUCCESS,
  COURSE_QUIZ_GET_ERROR,
  COURSE_QUIZ_GET_REQUEST,
  COURSE_QUIZ_GET_SUCCESS,
  QUIZ_CREATE_ERROR,
  QUIZ_CREATE_REQUEST,
  QUIZ_CREATE_RESET,
  QUIZ_CREATE_SUCCESS,
  TEACHER_COURSE_GET_ERROR,
  TEACHER_COURSE_GET_REQUEST,
  TEACHER_COURSE_GET_SUCCESS,
} from "../constants/courseConstants";

export const courseListReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case COURSE_GET_REQUEST:
      return { loading: true, courses: [] };
    case COURSE_GET_SUCCESS:
      return {
        loading: false,
        courses: action.payload,
      };
    case COURSE_GET_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Create Course
export const courseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_CREATE_REQUEST:
      return { loading: true };
    case COURSE_CREATE_SUCCESS:
      return { loading: false, success: true, course: action.payload };
    case COURSE_CREATE_ERROR:
      return { loading: false, error: action.payload };
    case COURSE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// Delete Course
export const courseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_DELETE_REQUEST:
      return { loading: true };
    case COURSE_DELETE_SUCCESS:
      return { loading: false, success: true, message: action.payload.message };
    case COURSE_DELETE_ERROR:
      return { loading: false, error: action.payload };
    case COURSE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// Teacher Course
export const teacherCourseReducer = (state = { courses: [] }, action) => {
  switch (action.type) {
    case TEACHER_COURSE_GET_REQUEST:
      return { loading: true, courses: [] };
    case TEACHER_COURSE_GET_SUCCESS:
      return {
        loading: false,
        courses: action.payload,
      };
    case TEACHER_COURSE_GET_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Course Quiz
export const getCourseQuizReducer = (state = { quizzes: [] }, action) => {
  switch (action.type) {
    case COURSE_QUIZ_GET_REQUEST:
      return { loading: true, quizzes: [] };
    case COURSE_QUIZ_GET_SUCCESS:
      return {
        loading: false,
        quizzes: action.payload,
      };
    case COURSE_QUIZ_GET_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Create Quiz
export const quizCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_CREATE_REQUEST:
      return { loading: true };
    case QUIZ_CREATE_SUCCESS:
      return { loading: false, success: true, quiz: action.payload.quiz };
    case QUIZ_CREATE_ERROR:
      return { loading: false, error: action.payload };
    case QUIZ_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
