import { 
	createSlice,
	createAsyncThunk,
	createSelector, 
	createEntityAdapter,
} from '@reduxjs/toolkit';
import { getTodos, createTodo, } from "../api/todos";

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
	status: 'idle',
});

// // Thunk function, async api
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
	const todos = await getTodos();
	return todos.map(
		(todo) => ({ ...todo, isEdit: false })
	);
});

export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async (newTodo) => {
	console.log('[saveNewTodo] newTodo', newTodo);
	const data = await createTodo(newTodo);
	console.log('[saveNewTodo] data', data);
	return {
		...data,
		isEdit: false,
	}
});

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		todoToggled(state, action) {
			console.log('[reducers] todoToggled');
			// const todo = state.find(todo => todo.id === action.payload);
			// todo.isDone = !todo.isDone
		},
		todoDeleted(state, action) {
			console.log('[reducers] todoDeleted');
			// state.filter(todo => todo.id !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				todosAdapter.setAll(state, action.payload);
				state.status = 'idle';
			})
			.addCase(saveNewTodo.pending, (state, action) => {
				console.log('[saveNewTodo pending]', action);
				state.status = 'loading';
			})
			.addCase(saveNewTodo.fulfilled, (state, action) => {
				console.log('[saveNewTodo fulfilled] state', state);
				console.log('[saveNewTodo fulfilled] action', action);
				todosAdapter.addOne(state, action.payload);
				state.status = 'idle';
			})
	}
});

export const { 
	todoToggled,
	todoDeleted,
} = todosSlice.actions;

export default todosSlice.reducer;

// selectors
export const {
  selectAll: selectTodos,
} = todosAdapter.getSelectors((state) => {
	return state.todos;
})

// Selector function
export const selectTodoList = createSelector(
	selectTodos,
	(state) => {
		return state;
	},
);
