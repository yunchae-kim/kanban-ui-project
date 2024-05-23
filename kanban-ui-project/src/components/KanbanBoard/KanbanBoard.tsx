import React, { useState } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import TaskColumn from '../TaskColumn/TaskColumn';
import { Task } from '../../types/Task';

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleCreateTask = (title: string, tags: string[]) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      tags,
      status: 'todo',
    };
    setTasks([...tasks, newTask]);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string,
  ) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    status: Task['status'],
  ) => {
    const taskId = e.dataTransfer.getData('text');
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task,
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
      <TaskForm onSubmit={handleCreateTask} />
      <div className="mt-8 grid grid-cols-3 gap-4">
        <TaskColumn
          title="To Do"
          tasks={tasks.filter((task) => task.status === 'todo')}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          status="todo"
        />
        <TaskColumn
          title="In Progress"
          tasks={tasks.filter((task) => task.status === 'in-progress')}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          status="in-progress"
        />
        <TaskColumn
          title="Done"
          tasks={tasks.filter((task) => task.status === 'done')}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          status="done"
        />
      </div>
    </div>
  );
};

export default KanbanBoard;
