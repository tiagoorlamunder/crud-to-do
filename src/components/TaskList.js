import React, { useState } from 'react';
import { AiOutlinePlus, AiFillCalendar, AiFillDelete } from 'react-icons/ai';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = () => {
    setTasks([...tasks, { text: "", subtasks: [] }]);
  };

  const handleRemoveTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleAddSubtask = (taskIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].subtasks.push("");
    setTasks(newTasks);
  };

  const handleRemoveSubtask = (taskIndex, subtaskIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].subtasks.splice(subtaskIndex, 1);
    setTasks(newTasks);
  };

  const handleTaskChange = (event, index) => {
    const newTasks = [...tasks];
    newTasks[index].text = event.target.value;
    setTasks(newTasks);
  };

  const handleSubtaskChange = (event, taskIndex, subtaskIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].subtasks[subtaskIndex] = event.target.value;
    setTasks(newTasks);
  };

  const handleCalendarButtonClick = (taskIndex, isSubtask, subtaskIndex = null) => {
    setSelectedTask({ taskIndex, isSubtask, subtaskIndex });
  };

  const renderCalendar = () => {
    if (selectedTask === null) return null;
    return (
      <div className="calendar-container">
        <h3>Alterar data de início e fim</h3>
        <input type="date" />
        <input type="date" />
        <button onClick={() => setSelectedTask(null)}>Fechar</button>
      </div>
    );
  };

  return (
    <div className="task-list">
      {selectedTask && <div className="overlay" />}
      <div className="task-list-header">
        <h2>Lista de Tarefas</h2>
        <button onClick={handleAddTask}>Adicionar tarefa</button>
      </div>
      {tasks.map((task, index) => (
        <div key={index} className="task">
          <div className="task-input">
            <input
              type="text"
              placeholder={`Tarefa ${index + 1}`}
              value={task.text}
              onChange={(event) => handleTaskChange(event, index)}
            />
            <div className="task-buttons">
              <button
                className="add-subtask-button"
                onClick={() => handleAddSubtask(index)}
              >
                <AiOutlinePlus />
              </button>
              <button
                className="add-subtask-button"
                onClick={() => handleCalendarButtonClick(index, false)}
              >
                <AiFillCalendar />
              </button>
              <button
                className="remove-task-button"
                onClick={() => handleRemoveTask(index)}
              >
                <AiFillDelete />
              </button>
            </div>
          </div>
          {task.subtasks.map((subtask, subtaskIndex) => (
            <div key={subtaskIndex} className="subtask">
              <input
                type="text"
                placeholder={`Subtarefa ${subtaskIndex + 1}`}
                value={subtask}
                onChange={(event) =>
                  handleSubtaskChange(event, index, subtaskIndex)
                }
              />
              <div className="subtask-buttons">
                <button
                  className="add-subtask-button"
                  onClick={() =>
                    handleCalendarButtonClick(index, true, subtaskIndex)
                  }
                >
                  <AiFillCalendar />
                </button>
                <button
                  className="remove-subtask-button"
                  onClick={() => handleRemoveSubtask(index, subtaskIndex)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
          {index < tasks.length - 1 && (
            <div className="task-separator">
              <hr />
            </div>
          )}
        </div>
      ))}
      {renderCalendar()}
    </div>
  );
}

export default TaskList;
