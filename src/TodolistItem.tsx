import { useState } from "react";
import { FilterValues, Task } from "./App";
import { Button } from "./Button";

type TodolistItemProps = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  createTask: (taskTitle: string) => void
};

export const TodolistItem = ({
  title,
  tasks,
  deleteTask,
  changeFilter,
  createTask
}: TodolistItemProps) => {

  const [taskTitle, setTaskTitle] = useState('');

  const createTaskHandler = () => {
    createTask(taskTitle);
    setTaskTitle("");
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.currentTarget.value)}
        />
        <Button onClick={createTaskHandler} title="+" />
      </div>
      {tasks.length === 0 ? (
        <p>The list is empty</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />{" "}
              <span>{task.title}</span>
              <Button onClick={() => deleteTask(task.id)} title="X" />
            </li>
          ))}
        </ul>
      )}
      <div>
        <Button onClick={() => changeFilter("all")} title="All" />
        <Button onClick={() => changeFilter("active")} title="Active" />
        <Button onClick={() => changeFilter("completed")} title="Completed" />
      </div>
    </div>
  );
};
