import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo/todo-slice';
import userReducer from './user/user-slice';
import { apiAuthSlice } from './api/api-auth-slice';
import { apiTodoSlice } from './api/api-todo-slice';

const store = configureStore({
    reducer: {
        todo: todoReducer,
        user: userReducer,
        [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
        [apiTodoSlice.reducerPath]: apiTodoSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiAuthSlice.middleware, apiTodoSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
