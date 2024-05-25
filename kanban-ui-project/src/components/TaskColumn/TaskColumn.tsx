import React, { useState } from 'react';
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
  selectedTags: string[];
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
  selectedTags,
}) => {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const handleToggleExpand = (taskId: string) => {
    setExpandedTaskId((prevTaskId) => (prevTaskId === taskId ? null : taskId));
  };

  const renderTaskCard = (task: Task) => {
    const isExpanded = expandedTaskId === task.id;
    const titleLimit = 40;
    const tagsLimit = 3;

    const truncatedTitle =
      task.title.length > titleLimit
        ? `${task.title.slice(0, titleLimit)}...`
        : task.title;
    const truncatedTags = task.tags.slice(0, tagsLimit);

    return (
      <div
        key={task.id}
        className="bg-white p-4 rounded shadow mb-4"
        draggable
        onDragStart={(e) => onDragStart(e, task.id)}
      >
        <h3
          className={`font-bold ${
            isExpanded
              ? 'break-words'
              : 'whitespace-nowrap overflow-hidden text-ellipsis'
          }`}
        >
          {isExpanded ? task.title : truncatedTitle}
        </h3>
        <div className="mt-2">
          {(isExpanded ? task.tags : truncatedTags).map((tag) => (
            <span
              key={tag}
              className={`inline-block rounded-full mb-1 px-2 py-1 text-xs font-semibold mr-2 ${
                selectedTags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tag}
            </span>
          ))}
          {!isExpanded && task.tags.length > tagsLimit && (
            <span className="inline-block text-xs text-gray-500">
              +{task.tags.length - tagsLimit} more
            </span>
          )}
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
        {(task.title.length > titleLimit || task.tags.length > tagsLimit) && (
          <button
            className="mt-2 text-xs text-blue-500 hover:text-blue-700"
            onClick={() => handleToggleExpand(task.id)}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className="bg-gray-100 p-4 rounded"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {tasks.map(renderTaskCard)}
    </div>
  );
};

export default TaskColumn;
