import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }
    onAddTask(inputValue.trim());
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a task..."
        className="task-input"
      />
      <button type="submit" className="add-task-btn">Add Task</button>
    </form>
  );
}

export default TaskForm;

