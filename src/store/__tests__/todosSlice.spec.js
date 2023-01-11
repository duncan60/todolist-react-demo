import todosSlice, { initialState, todoEditMode } from "../todosSlice";

describe("tests for todoSlice", () => {
  test("initialize slice with initialValue", () => {
    const todoSliceInit = todosSlice(initialState, { type: "unknown" });
    expect(todoSliceInit).toBe(initialState);
  });
	test('reducers: todoEditMode', () => {
		const testInitState = { 
			ids: [1, 2], 
			entities: {
				1: {
					id: 1,
					isEdit: false,
				},
				2: {
					id: 2,
					isEdit: false,
				}
			}, 
			status: 'idle' 
		};
		const eualData = {
			ids: [1, 2], 
			entities: {
				1: {
					id: 1,
					isEdit: false,
				},
				2: {
					id: 2,
					isEdit: true,
				}
			}, 
			status: 'idle' 
		};
		const afterReducerOperationCase1 = todosSlice(
      testInitState,
      todoEditMode({id: 2})
    );
		expect(afterReducerOperationCase1).toEqual(eualData);

		const afterReducerOperationCase2 = todosSlice(
      testInitState,
      todoEditMode({id: 3})
    );
		expect(afterReducerOperationCase2).toEqual(testInitState);
	});
});