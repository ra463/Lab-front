import { configureStore } from '@reduxjs/toolkit';
import { adminReducer } from './reducers/adminReducer';
import { courseReducer } from './reducers/courseReducer';
import { otherReducer } from './reducers/otherReducer';
import {
  profileReducer,
  subscribeReducer,
  userReducer,
} from './reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    updateProfile: profileReducer,
    courses: courseReducer,
    subscribe: subscribeReducer,
    admin: adminReducer,
    other : otherReducer,
  },
});

export default store;

export const server = 'https://llab-back.vercel.app/api/v1';
