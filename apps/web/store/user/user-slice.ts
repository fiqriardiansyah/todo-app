import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthType } from '../../models/auth';

export interface UserState {
    user?: Partial<AuthType>;
}

const initialState: UserState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthType>) => {
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },
        setLogout: (state) => {
            state.user = {};
        },
    },
});

export const { setUser, setLogout } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
