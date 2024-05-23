import React from 'react';
import { Task } from '../../types/Task';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, status: Task['status']) => void;
  status: Task['status'];
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
  status,
  onEditTask,
  onDeleteTask,
}) => {
  return (
    <div
      className="bg-gray-100 p-4 rounded"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded shadow mb-4"
          draggable
          onDragStart={(e) => onDragStart(e, task.id)}
        >
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
          <div className="mt-4 flex justify-end">
            <button
              className="text-blue-500 hover:text-blue-700 mr-4"
              onClick={() => onEditTask(task.id)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskColumn;
