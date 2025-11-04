function TaskCounter({ tasks, filter }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  let counterText = '';
  if (filter === 'all') {
    counterText = `${totalTasks} tasks`;
  } else if (filter === 'active') {
    counterText = `${activeTasks} of ${totalTasks} tasks`;
  } else if (filter === 'completed') {
    counterText = `${completedTasks} of ${totalTasks} tasks`;
  }

  return (
    <div className="task-counter-display">
      <p>{counterText}</p>
    </div>
  );
}

export default TaskCounter;

