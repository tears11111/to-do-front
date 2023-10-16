import './style.scss';

const AddTaskField = ({ addNewTask, singleTask, handleChange }) => (
  <div className="todo-list__add-task-field">
    <h1>To-Do List</h1>

    <div className="add-task">
      <div className="task-enter-title">
        <p className="task-enter-title__description">task title:</p>
        <input 
          type="text"
          id="task-input"
          value={singleTask.title}
          maxLength="15"
          onChange={(event) => handleChange('title', event.target.value)} 
        />
      </div>

      <div className="task-enter-text">
        <p className="task-enter-text__description">task text:</p>
        <textarea
          className="task-write-text"
          rows="4"
          id="task-input"
          value={singleTask.text}
          onChange={(event) => handleChange('text', event.target.value)}
        />
      </div>
      
      <button 
        className="add-task__button" 
        type="button" 
        onClick={addNewTask}
      >
        Add
      </button>
    </div>
  </div>
);

export default AddTaskField;
