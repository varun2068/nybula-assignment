import axios from "axios";
import {
  COURSE_CREATE_ERROR,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_DELETE_ERROR,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_GET_ERROR,
  COURSE_GET_REQUEST,
  COURSE_GET_SUCCESS,
  COURSE_QUIZ_GET_ERROR,
  COURSE_QUIZ_GET_REQUEST,
  COURSE_QUIZ_GET_SUCCESS,
  QUIZ_CREATE_ERROR,
  QUIZ_CREATE_REQUEST,
  QUIZ_CREATE_SUCCESS,
  TEACHER_COURSE_GET_ERROR,
  TEACHER_COURSE_GET_REQUEST,
  TEACHER_COURSE_GET_SUCCESS,
} from "../constants/courseConstants";
import { logout } from "./userActions";

export const courseList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_GET_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/v1/api/courses", config);

    dispatch({
      type: COURSE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (
      message === "Token Expired!" ||
      message === "Invalid Token!" ||
      message === "Unauthorized Access, No Token Provided!"
    ) {
      dispatch(logout());
    }

    dispatch({
      type: COURSE_GET_ERROR,
      payload: message,
    });
  }
};

export const createCourse =
  (courseName, courseDescription, courseLevel) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: COURSE_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/v1/api/courses",
        { courseName, courseDescription, courseLevel },
        config
      );

      dispatch({
        type: COURSE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (
        message === "Token Expired!" ||
        message === "Invalid Token!" ||
        message === "Unauthorized Access, No Token Provided!"
      ) {
        dispatch(logout());
      }

      dispatch({
        type: COURSE_CREATE_ERROR,
        payload: message,
      });
    }
  };

export const deleteCourse = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/v1/api/courses/${id}`, config);

    dispatch({
      type: COURSE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (
      message === "Token Expired!" ||
      message === "Invalid Token!" ||
      message === "Unauthorized Access, No Token Provided!"
    ) {
      dispatch(logout());
    }

    dispatch({
      type: COURSE_DELETE_ERROR,
      payload: message,
    });
  }
};

export const getCourseByTeacherId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_COURSE_GET_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/v1/api/courses/teacher/${id}`, config);

    dispatch({
      type: TEACHER_COURSE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (
      message === "Token Expired!" ||
      message === "Invalid Token!" ||
      message === "Unauthorized Access, No Token Provided!"
    ) {
      dispatch(logout());
    }

    dispatch({
      type: TEACHER_COURSE_GET_ERROR,
      payload: message,
    });
  }
};

export const getCourseQuizByCourseId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COURSE_QUIZ_GET_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/v1/api/quizzes/${id}`, config);

    dispatch({
      type: COURSE_QUIZ_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (
      message === "Token Expired!" ||
      message === "Invalid Token!" ||
      message === "Unauthorized Access, No Token Provided!"
    ) {
      dispatch(logout());
    }

    dispatch({
      type: COURSE_QUIZ_GET_ERROR,
      payload: message,
    });
  }
};

export const quizCreate =
  (id, name, minPoints, time) => async (dispatch, getState) => {
    try {
      dispatch({
        type: QUIZ_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/v1/api/quizzes/${id}`,
        { name, minPoints, time },
        config
      );

      dispatch({
        type: QUIZ_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      if (
        message === "Token Expired!" ||
        message === "Invalid Token!" ||
        message === "Unauthorized Access, No Token Provided!"
      ) {
        dispatch(logout());
      }

      dispatch({
        type: QUIZ_CREATE_ERROR,
        payload: message,
      });
    }
  };
