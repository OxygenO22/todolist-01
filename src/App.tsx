import { useState } from 'react'
import './App.css'
import { TodolistItem } from './TodolistItem'
import { v1 } from "uuid";

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = "all" | "active" | "completed";
export const App = () => {
  const [filter, setFilter] = useState<FilterValues>("all");
  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Typescript", isDone: false },
    { id: v1(), title: "RTK query", isDone: false },
  ])

  let filteredTasks = tasks;
  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.isDone);
  }
  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.isDone);
  }

  const changeFilter = (filter: FilterValues) => setFilter(filter);

  const deleteTask = (taskId: string) => setTasks(tasks.filter(task => task.id != taskId));

  const createTask = (taskTitle: string) =>
    setTasks([{ id: v1(), title: taskTitle, isDone: false }, ...tasks]);

  return (
    <div className="app">
      <TodolistItem
        title="Hello"
        tasks={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask={createTask}
      />
    </div>
  );
}

