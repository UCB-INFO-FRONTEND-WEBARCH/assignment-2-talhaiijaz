function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="task-checkbox"
      />
      <span className={`task-text ${task.completed ? 'completed' : ''}`}>
        {task.text}
      </span>
      <button 
        onClick={() => onDelete(task.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;

