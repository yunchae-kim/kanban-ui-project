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
          {tasks
            .filter((task) => task.status === 'todo')
            .map((task) => (
              <div key={task.id} className="bg-white p-4 rounded shadow mb-4">
                <h3 className="font-bold">{task.title}</h3>
                <div className="mt-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">In Progress</h2>
          {tasks
            .filter((task) => task.status === 'in-progress')
            .map((task) => (
              <div key={task.id} className="bg-white p-4 rounded shadow mb-4">
                <h3 className="font-bold">{task.title}</h3>
                <div className="mt-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Done</h2>
          {tasks
            .filter((task) => task.status === 'done')
            .map((task) => (
              <div key={task.id} className="bg-white p-4 rounded shadow mb-4">
                <h3 className="font-bold">{task.title}</h3>
                <div className="mt-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;