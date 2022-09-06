import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
  { courses: [], lectures: [] },
  {
    allCoursesRequest: state => {
      state.loading = true;
    },
    allCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    allCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCoursesRequest: state => {
      state.loading = true;
    },
    getCoursesSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    },
    getCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCourseToPlaylistRequest: state => {
      state.loading = true;
    },
    addCourseToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addCourseToPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromPlaylistRequest: state => {
      state.loading = true;
    },
    removeFromPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    removeFromPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
