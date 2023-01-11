import { 
	createSlice,
	createAsyncThunk,
	createSelector, 
} from '@reduxjs/toolkit';
import {
	login,
} from "../api/auth";


// Thunk function, async api
export const authLogin = createAsyncThunk('auth/login', async ({ username, password }) => {
	const result = await login({ username, password });
	return result;
});

// Store Slice
const authSlice = createSlice({
	name: 'auth',
	initialState: {
		status: 'idle',
    token: '',
		user: {
			id: '',
			name: '',
		}
  },
	reducers: {},
	extraReducers: (builder) => {
		builder
		.addCase(authLogin.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(authLogin.fulfilled, (state, action) => {
			console.log('[authLogin.fulfilled] action', action);
			state.token = 'for testing';
			state.user = {
				id: '1',
				name: action.payload.username,
			}
			state.status = 'idle';
		})
	}
});

// export const { } = authSlice.actions;

export default authSlice.reducer;

// Selector function
export const selectAuth = createSelector(
	(state) => state.auth,
	(auth) => auth,
);

export const selectAuthUser = createSelector(
	(state) => state.auth,
	(auth) => auth.user,
);