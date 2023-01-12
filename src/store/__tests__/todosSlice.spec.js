import todosSlice, {
	initialState,
	todoEditMode,
	saveNewTodo,
	updateTodo,
	removeTodo,
} from "../todosSlice";

let initTestState = {};

beforeEach(() => {
	initTestState = { 
		ids: [1, 2], 
		entities: {
			1: {
				id: 1,
				title: 'title 1',
				isEdit: false,
			},
			2: {
				id: 2,
				title: 'title 2',
				isEdit: false,
			}
		}, 
		status: 'idle' 
	}
});

describe("tests for todoSlice reducers", () => {
 test("initialize slice with initialValue", () => {
		const todoSliceInit = todosSlice(initialState, { type: "unknown" });
		expect(todoSliceInit).toBe(initialState);
	});
	test('todoEditMode', () => {
		const equalState = {
			ids: [1, 2], 
			entities: {
				1: {
					id: 1,
					title: 'title 1',
					isEdit: false,
				},
				2: {
					id: 2,
					title: 'title 2',
					isEdit: true,
				}
			}, 
			status: 'idle' 
		};
		const afterReducerCase1 = todosSlice(
				initTestState,
				todoEditMode({id: 2})
		);
		expect(afterReducerCase1).toEqual(equalState);

		const afterReducerCase2 = todosSlice(
				initTestState,
				todoEditMode({id: 3})
    );
		expect(afterReducerCase2).toEqual(initTestState);
	});
});

describe("tests for todoSlice extraReducers", () => {
	test('saveNewTodo.pending', () => {
		const equalState = {
			...initTestState,
			status: 'loading' 
		}
		const action = { type: saveNewTodo.pending.type };
		const afterReducerCase = todosSlice(initTestState, action);
		expect(afterReducerCase).toEqual(equalState);
	});
	test('saveNewTodo.fulfilled', () => {
		const equalState = {
			...initTestState,
			ids: [1, 2, 3], 
			entities: {
				...initTestState.entities,
				3: {
					id: 3,
					title: 'title 3',
					isEdit: false,
				},
			},
		}
		const action = { type: saveNewTodo.fulfilled.type, payload: {
			id: 3,
			title: 'title 3',
			isEdit: false,
		} };
		const afterReducerCase = todosSlice(initTestState, action);
		expect(afterReducerCase).toEqual(equalState);
	});
	test('updateTodo.fulfilled', () => {
		const equalState = {
			...initTestState,
			entities: {
				...initTestState.entities,
				1: {
					id: 1,
					title: 'testing update',
					isEdit: false,
				},
			}, 
			status: 'idle' 
		}
		const action = { type: updateTodo.fulfilled.type, payload: {
			id: 1,
			title: 'testing update',
		} };
		const afterReducerCase = todosSlice(initTestState, action);
		expect(afterReducerCase).toEqual(equalState);
	});
	test('updateTodo.removeTodo', () => {
		const equalState = {
			...initTestState,
			ids: [2,], 
			entities: {
				2: {
					id: 2,
					title: 'title 2',
					isEdit: false,
				}
			}, 
		}
		const action = { type: removeTodo.fulfilled.type, payload: {id: 1,} };
		const afterReducerCase = todosSlice(initTestState, action);
		expect(afterReducerCase).toEqual(equalState);
	});
});