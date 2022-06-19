import axios from "axios";
import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_RESET,
} from "../constants/userConstants";

// Register user action
export const register =
  (name, email, password, isTeacher) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        "/v1/api/auth/register",
        { name, email, password, isTeacher },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data.user,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.user,
      });

      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

      setTimeout(() => {
        dispatch({ type: USER_REGISTER_RESET });
      }, 3000);
    }
  };

// Login user action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      "/v1/api/auth/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem("user", JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    setTimeout(() => {
      dispatch({ type: USER_LOGIN_RESET });
    }, 3000);
  }
};

// Logout user
export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: USER_LOGOUT });
};
