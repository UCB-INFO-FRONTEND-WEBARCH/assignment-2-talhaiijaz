import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
  // Show a message if there are no tasks to display
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks yet! Add one to get started.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;

