import React, { useState } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import TaskColumn from '../TaskColumn/TaskColumn';

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
        <TaskColumn
          title="To Do"
          tasks={tasks.filter((task) => task.status === 'todo')}
        />
        <TaskColumn
          title="In Progress"
          tasks={tasks.filter((task) => task.status === 'in-progress')}
        />
        <TaskColumn
          title="Done"
          tasks={tasks.filter((task) => task.status === 'done')}
        />
      </div>
    </div>
  );
};

export default KanbanBoard;
