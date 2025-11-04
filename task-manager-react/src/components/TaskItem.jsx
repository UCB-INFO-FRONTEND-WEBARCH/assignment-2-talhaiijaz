import { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  // Inline edit state
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(task.text);

  // Enter edit mode
  const startEditing = () => {
    setDraftText(task.text);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftText(task.text);
    setIsEditing(false);
  };

  const saveEditing = () => {
    const trimmed = draftText.trim();
    if (trimmed === '') {
      setDraftText(task.text);
      setIsEditing(false);
      return;
    }
    if (trimmed !== task.text) {
      onEdit(task.id, trimmed);
    }
    setIsEditing(false);
  };

  // Enter to save, Esc to cancel
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEditing();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEditing();
    }
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="task-checkbox"
      />

      {isEditing ? (
        <input
          type="text"
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={saveEditing}
          className="task-input"
          autoFocus
        />
      ) : (
        <span className={`task-text ${task.completed ? 'completed' : ''}`}>
          {task.text}
        </span>
      )}

      {isEditing ? (
        <>
          <button onClick={saveEditing} className="edit-btn">Save</button>
          <button onClick={cancelEditing} className="delete-btn">Cancel</button>
        </>
      ) : (
        <>
          <button onClick={startEditing} className="edit-btn">Edit</button>
          <button onClick={() => onDelete(task.id)} className="delete-btn">Delete</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;

