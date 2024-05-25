import React from 'react';
import { Task } from '../../types/Task';
import deleteIcon from '../../assets/icons/delete-icon.svg';
import editIcon from '../../assets/icons/edit-icon.svg';

interface TaskCardProps {
  task: Task;
  isExpanded: boolean;
  selectedTags: string[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleExpand: (taskId: string) => void;
  onConfirmDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isExpanded,
  selectedTags,
  onDragStart,
  onEditTask,
  onDeleteTask,
  onToggleExpand,
  onConfirmDelete,
}) => {
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
      className="p-4 mb-4 bg-white rounded shadow"
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
            className={`inline-block py-2 px-3 mb-1 mr-2 text-xs font-semibold rounded-full ${
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
      <div className="flex justify-end mt-4">
        <button className="mr-4" onClick={() => onEditTask(task.id)}>
          <img src={editIcon} alt="Edit" className="w-5 h-5" />
        </button>
        <button className="mr-4" onClick={() => onConfirmDelete(task.id)}>
          <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
        </button>
      </div>
      {(task.title.length > titleLimit || task.tags.length > tagsLimit) && (
        <button
          className="mt-2 text-xs text-blue-500 hover:text-blue-700"
          onClick={() => onToggleExpand(task.id)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};

export default TaskCard;
