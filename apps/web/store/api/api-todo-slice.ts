import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './base-query';
import { TodoType, TodoTypeResponse } from 'models/todo';

export const todoEndpoints = {
    createTodo: '/todo',
};

export const apiTodoSlice = createApi({
    reducerPath: 'api/todo',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        createTodo: builder.mutation<TodoTypeResponse, TodoType>({
            query: (arg) => {
                return {
                    url: todoEndpoints.createTodo,
                    body: arg,
                    method: 'post',
                };
            },
        }),
    }),
});

export const { useCreateTodoMutation } = apiTodoSlice;
