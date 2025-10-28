function TaskCounter({ tasks, filter }) {
  // Count up the different types of tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  // Show different message depending on what filter is active
  let displayMessage = '';
  if (filter === 'all') {
    displayMessage = `Showing ${totalTasks} total tasks`;
  } else if (filter === 'active') {
    displayMessage = `Showing ${activeTasks} active tasks`;
  } else if (filter === 'completed') {
    displayMessage = `Showing ${completedTasks} completed tasks`;
  }

  return (
    <div className="task-counter-display">
      <p>{displayMessage}</p>
      <p>Total: {totalTasks} | Active: {activeTasks} | Completed: {completedTasks}</p>
    </div>
  );
}

export default TaskCounter;

