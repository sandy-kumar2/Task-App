import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [addCounter, setAddCounter] = useState(0);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [showCount, setShowCount] = useState(false);

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Function to add a task
  const addTask = async () => {
    try {
      await axios.post("http://localhost:8080/tasks", { task: taskInput });
      setTaskInput("");
      setAddCounter(addCounter + 1);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to update a task
  const updateTask = async (taskId, updatedTask) => {
    try {
      await axios.put(`http://localhost:8080/tasks/${taskId}`, {
        task: updatedTask,
      });
      setUpdateCounter(updateCounter + 1);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  //Show Api Counts 
  const handleApiCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/counters`);
      setAddCounter(response.data.addCounter);
      setUpdateCounter(response.data.updateCounter);
    } catch (error) {
      console.error("Error updating tasks count:", error);
    }
  };

  return (
    <div className="full-page">
      <div className="content">
        <h1>Todo Application</h1>
        <div>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter task..."
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <div>
          <h2>Tasks</h2>
          <ol className="list">
            {tasks.map((task, index) => (
              <li key={index} className="item">
                <div>{task}</div>
                <div>
                  <button
                    onClick={() =>
                      updateTask(index, prompt("Enter updated task"))
                    }
                  >
                    Update
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="show-data">
          <button onClick={fetchTasks}>Show Tasks List</button>
          <button
            onClick={() => {
              setShowCount(true);
              handleApiCount();
            }}
          >
            Show API Calls
          </button>
          {showCount && (
            <div>
              <p>No. of Tasks: {addCounter}</p>
              <p>No. of Updates: {updateCounter}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
