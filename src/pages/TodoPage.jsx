import { useState, useEffect } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useSelector, useDispatch } from "react-redux";
import { 
  fetchTodos,
  saveNewTodo,
  selectTodoList,
} from "../store/todosSlice";

const TodoPage = () => {
  const currentMember = {
    name: 'test',
  }
  const [inputValue, setInputValue] = useState('');
  const todos = useSelector(selectTodoList);
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
  }
  const handleKeyDown = () => {
    console.log('handleKeyDown');
    // if (inputValue.length === 0) {
    //   return;
    // }
    // setTodos((prevTodos) => {
    //   return [
    //     ...prevTodos,
    //     {
    //       id: Math.random() * 100,
    //       title: inputValue,
    //       isDone: false,
    //     },
    //   ];
    // });
    // setInputValue('');
  };
  const handleToggleDone = async (id) => {
    console.log('handleToggleDone', id);
    // const currentTodo = todos.find((todo) => todo.id === id);
    // try {
    //   await patchTodo({
    //     id,
    //     isDone: !currentTodo.isDone,
    //   });
    //   setTodos((prevTodos) => {
    //     return prevTodos.map((todo) => {
    //       if (todo.id === id) {
    //         return {
    //           ...todo,
    //           isDone: !todo.isDone,
    //         };
    //       }
    //       return todo;
    //     });
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };
  const handleChangeMode = ({ id, isEdit }) => {
    console.log('handleChangeMode', id);
    console.log('handleChangeMode', isEdit);
    // setTodos((prevTodos) => {
    //   return prevTodos.map((todo) => {
    //     if (todo.id === id) {
    //       return {
    //         ...todo,
    //         isEdit,
    //       };
    //     }
    //     return { ...todo, isEdit: false };
    //   });
    // });
  };
  const handleSave = async ({ id, title }) => {
    console.log('handleSave', id);
    console.log('handleSave', title);
    // try {
    //   await patchTodo({
    //     id,
    //     title,
    //   });
    //   setTodos((prevTodos) => {
    //     return prevTodos.map((todo) => {
    //       if (todo.id === id) {
    //         return { ...todo, title, isEdit: false };
    //       }
    //       return todo;
    //     });
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };
  const handleDelete = async (id) => {
    // console.log('handleDelete', id);
    // try {
    //   await deleteTodo(id);
    //   // setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    // } catch (error) {
    //   console.error(error);
    // }
  };
  return (
    <div>
      TodoPage
      <Header username={currentMember?.name} />
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
