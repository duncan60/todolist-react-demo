import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoCollection = ({ todos, onToggleDone, onSave, onDelete, onChangeMode, }) => {
  return (
    <div>
      { 
        todos.map(todo => {
          return <TodoItem 
            key={todo.id} todo={todo}
            onSave={({ id, title }) => onSave?.({ id, title })}
            onToggleDone={(id) => onToggleDone?.(id)}
            onChangeMode={({ id, isEdit }) => onChangeMode?.({ id, isEdit })}
            onDelete={(id)=> {onDelete?.(id)}}
          />
        })
      }
    </div>
  );
};

TodoCollection.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
      isEdit: PropTypes.bool.isRequired,
    })
  ),
  onToggleDone: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  onChangeMode: PropTypes.func,
}
TodoCollection.defaultProps = {
  todos: [{
    id: 0,
    title: '',
    isDone: '',
    isEdit: '',
  }],
  onToggleDone: (id) => {},
  onSave: ({id, title}) => {},
  onDelete: (id) => {},
  onChangeMode: ({id, isEdit}) => {},
};

export default TodoCollection;
