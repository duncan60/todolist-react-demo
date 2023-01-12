import { useState, useEffect } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useSelector, useDispatch } from "react-redux";
import { 
  fetchTodos,
  saveNewTodo,
  updateTodo,
  removeTodo,
  selectTodoList,
  todoEditMode,
} from "../store/todosSlice";
import { 
  selectAuthUser,
} from "../store/authSlice";

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');

  const todos = useSelector(selectTodoList);
  const authUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleInput = (value) => {
    setInputValue(value);
  }

  const handleAddTodo = async () => {
    await dispatch(saveNewTodo({
      title: inputValue,
      isDone: false,
    }));
    setInputValue('');
  };

  const handleKeyDown = async () => {
    await dispatch(saveNewTodo({
      title: inputValue,
      isDone: false,
    }));
    setInputValue('');
  };
  const handleToggleDone = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    await dispatch(updateTodo({
      ...currentTodo,
      isDone: !currentTodo.isDone,
    }));
  };

  const handleChangeMode = ({ id }) => {
    dispatch(todoEditMode({
      id,
    }));
  };

  const handleSave = async ({ id, title }) => {
    await dispatch(updateTodo({
      id,
      title,
    }));
  };

  const handleDelete = async (id) => {
    await dispatch(removeTodo({
      id,
    }));
  };
  
  return (
    <div>
      TodoPage
      <Header username={authUser?.name} />
      <TodoInput
        inputValue={inputValue}
        onChange={handleInput}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection 
        todos={todos}
        onToggleDone={handleToggleDone}
        onSave={handleSave}
        onChangeMode={handleChangeMode}
        onDelete={handleDelete}
      />
      <Footer numOfTodos={todos?.length} />
    </div>
  );
};

export default TodoPage;
