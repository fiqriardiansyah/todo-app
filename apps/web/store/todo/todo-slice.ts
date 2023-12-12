import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
    },
    reducers: {},
});

export const {} = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export type TodoReducer = typeof todoReducer;

export default todoReducer;
