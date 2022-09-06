import { server } from '../store';
import axios from 'axios';

export const contactUs = (name, email, message) => async dispatch => {
  try {
    dispatch({ type: 'contactUsRequest' });

    const { data } = await axios.post(
      `${server}/contact`,
      { name, email, message },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'contactUsSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'contactUsFail',
      payload: error.response.data.message,
    });
  }
};

export const requestCourse = (name, email, course) => async dispatch => {
  try {
    dispatch({ type: 'requestCourseRequest' });

    const { data } = await axios.post(
      `${server}/requestcourse`,
      { name, email, course },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'requestCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'requestCourseFail',
      payload: error.response.data.message,
    });
  }
};
