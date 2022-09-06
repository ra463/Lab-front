import { server } from '../store';
import axios from 'axios';

export const getAllCourses =
  (category = '', keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: 'allCoursesRequest' });

      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}`,
        {
          withCredentials: true,
        }
      );

      dispatch({ type: 'allCoursesSuccess', payload: data.courses });
    } catch (error) {
      dispatch({
        type: 'allCoursesFail',
        payload: error.response.data.message,
      });
    }
  };

export const addToPlaylistCourses = id => async dispatch => {
  try {
    dispatch({ type: 'addCourseToPlaylistRequest' });

    const { data } = await axios.post(
      `${server}/addtoplaylist`,
      {
        id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'addCourseToPlaylistSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addCourseToPlaylistFail',
      payload: error.response.data.message,
    });
  }
};

export const removeFromPlaylist = id => async dispatch => {
  try {
    dispatch({ type: 'removeFromPlaylistRequest' });

    const { data } = await axios.delete(
      `${server}/removefromplaylist?id=${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: 'removeFromPlaylistSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'removeFromPlaylistFail',
      payload: error.response.data.message,
    });
  }
};

export const getCourseLectures = id => async dispatch => {
  try {
    dispatch({ type: 'getCoursesRequest' });

    const { data } = await axios.get(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'getCoursesSuccess', payload: data.lectures });
  } catch (error) {
    dispatch({
      type: 'getCoursesFail',
      payload: error.response.data.message,
    });
  }
};
