import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'; 

const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    todo: [],
    doing: [],
    done: []
  });

  const addTask = (task, listId) => {
   
    const dateTime = new Date().toLocaleString();
    const newList = { ...tasks, [listId]: [...tasks[listId], { ...task, id: uuidv4(), date: dateTime}] };
    setTasks(newList);
  };
  
  const updateTask = (updatedTask, listId) => {
    const newList = { ...tasks, [listId]: tasks[listId].map(task => task.id === updatedTask.id ? updatedTask : task)}
    setTasks(newList);
 };

  const deleteTask = (taskId, listId) => {
    const newList = { ...tasks, [listId]: tasks[listId].filter(task => task.id !== taskId) };
    setTasks(newList);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        setTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;