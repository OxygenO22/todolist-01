import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValues, Task } from "./App";
import { Button } from "./Button";

type TodolistItemProps = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  createTask: (taskTitle: string) => void;
  changeTaskStatus: (id: string, status: boolean) => void
};

export const TodolistItem = ({
  title,
  tasks,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
}: TodolistItemProps) => {
  const [taskTitle, setTaskTitle] = useState("");

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle != "") {
      createTask(taskTitle);
      setTaskTitle("");
    }
  };

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTaskTitle(e.currentTarget.value);

  const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && createTaskHandler();

  const changeTaskStatusHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked;
    changeTaskStatus(id, newStatusValue);
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button onClick={createTaskHandler} title="+" />
      </div>
      {tasks.length === 0 ? (
        <p>The list is empty</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={(e) => changeTaskStatusHandler(task.id, e)}
              />{" "}
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
