import React, { useState } from 'react';
import TaskForm from './TaskForm';

interface Task {
  id: string;
  title: string;
  tags: string[];
  status: 'todo' | 'in-progress' | 'done';
}

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

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
      <TaskForm onSubmit={handleCreateTask} />
      {/* To-do: Columns for task status */}
    </div>
  );
};

export default KanbanBoard;