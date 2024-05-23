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
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">To Do</h2>
          {/* Tasks with 'todo' status will be rendered here */}
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">In Progress</h2>
          {/* Tasks with 'in-progress' status will be rendered here */}
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Done</h2>
          {/* Tasks with 'done' status will be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;