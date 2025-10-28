import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskCounter from './components/TaskCounter';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  // Load saved tasks from localStorage, or start with empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  // Keep track of which filter is active (all, active, or completed)
  const [filter, setFilter] = useState('all');

  // Sidebar should be open by default on desktop, closed on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth > 480;
  });

  // Track what the user types in the search box
  const [searchQuery, setSearchQuery] = useState('');

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task to the list
  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  // Toggle between completed and not completed
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Remove a task from the list
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Get the tasks we should show based on the current filter and search
  const getFilteredTasks = () => {
    let filtered = tasks;

    // First filter by completion status
    if (filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    // Then filter by search if there's something typed
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(task =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="app">
      <header className="main-header">
        <div className="header-content">
          <img 
            src="/assets/menu_icon.png" 
            alt="Menu" 
            className="menu-icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ cursor: 'pointer' }}
          />
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Quick find" 
              className="search-box"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src="/assets/search_icon.png" alt="Search icon" className="search-icon" />
          </div>
          <div className="task-counter-group">
            <img src="/assets/check_icon.png" alt="Check" className="check-icon" />
            <span className="task-counter">
              {tasks.filter(t => t.completed).length}/{tasks.length}
            </span>
          </div>
        </div>
      </header>

      <div className="container">
        <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <img src="/assets/inbox_icon.png" alt="Inbox" className="nav-icon" />
              <span className="nav-text">Inbox</span>
              <span className="nav-count">{tasks.length}</span>
            </li>
            <li className="nav-item">
              <img src="/assets/calendar_icon.png" alt="Today" className="nav-icon" />
              <span className="nav-text">Today</span>
              <span className="nav-count">{tasks.length}</span>
            </li>
            <li className="nav-item">
              <img src="/assets/upcoming_icon.png" alt="Upcoming" className="nav-icon" />
              <span className="nav-text">Upcoming</span>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <h1>Inbox</h1>
          
          <TaskForm onAddTask={addTask} />
          
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>

          <TaskCounter tasks={tasks} filter={filter} />
          
          <TaskList 
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
