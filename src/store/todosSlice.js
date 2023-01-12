import { 
	createSlice,
	createAsyncThunk,
	createSelector, 
	createEntityAdapter,
} from '@reduxjs/toolkit';
import {
	getTodos,
	createTodo,
	patchTodo,
	deleteTodo,
} from "../api/todos";

const todosAdapter = createEntityAdapter()

export const initialState = todosAdapter.getInitialState({
	status: 'idle',
});

// Thunk function, async api
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
	const todos = await getTodos();
	return todos.map(
		(todo) => ({ ...todo, isEdit: false })
	);
});

export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async (newTodo) => {
	const data = await createTodo(newTodo);
	return {
		...data,
		isEdit: false,
	}
});

export const updateTodo = createAsyncThunk('todos/patchTodo', async (todo) => {
	await patchTodo({
   ...todo,
  });
	return todo;
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
	await deleteTodo(id);
	return id;
});

// Store Slice
const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		todoEditMode(state, action) {
			const { id, }= action.payload;
			Object.entries(state.entities).forEach(([key]) => {
				state.entities[key].isEdit = Number(id) === Number(key);
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				todosAdapter.setAll(state, action.payload);
				state.status = 'idle';
			})
			.addCase(saveNewTodo.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(saveNewTodo.fulfilled, (state, action) => {
				todosAdapter.addOne(state, action.payload);
				state.status = 'idle';
			})
			.addCase(updateTodo.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateTodo.fulfilled, (state, action) => {
				todosAdapter.updateOne(state, {
					id: action.payload.id,
					changes: {
						...action.payload,
						isEdit: false,
					}
				});
				state.status = 'idle';
			})
			.addCase(removeTodo.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(removeTodo.fulfilled, (state, action) => {
				todosAdapter.removeOne(state, action.payload.id);
				state.status = 'idle';
			})
	}
});
export const { 
	todoEditMode,
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
	(todos) => {
		return todos;
	},
);
