import { useState, useEffect } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';


const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    
  }, []);

  const handleInput = (value) => {
    setInputValue(value);
  }

  const handleAddTodo = async () => {
    setInputValue('');
  };

  const handleKeyDown = async () => {

    setInputValue('');
  };
  const handleToggleDone = async (id) => {
    
  };

  const handleChangeMode = ({ id }) => {

  };

  const handleSave = async ({ id, title }) => {
   
  };

  const handleDelete = async (id) => {
   
  };
  
  return (
    <div>
      TodoPage
      <Header username={''} />
      <TodoInput
        inputValue={inputValue}
        onChange={handleInput}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection 
        todos={[]}
        onToggleDone={handleToggleDone}
        onSave={handleSave}
        onChangeMode={handleChangeMode}
        onDelete={handleDelete}
      />
      <Footer numOfTodos={[].length} />
    </div>
  );
};

export default TodoPage;
