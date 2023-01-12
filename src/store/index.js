import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  }
})