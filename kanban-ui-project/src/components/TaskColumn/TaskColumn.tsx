import React, { useState } from 'react';
import { Task } from '../../types/Task';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import TaskCard from '../TaskCard/TaskCard';

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
  onOpenTaskModal: (taskId?: string) => void;
}

/**
 * TaskColumn component represents a single column in the Kanban board.
 */
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
  onOpenTaskModal,
}) => {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [confirmDeleteTaskId, setConfirmDeleteTaskId] = useState<string | null>(
    null,
  );

  const handleToggleExpand = (taskId: string) => {
    setExpandedTaskId((prevTaskId) => (prevTaskId === taskId ? null : taskId));
  };

  const handleDeleteConfirmation = (taskId: string) => {
    setConfirmDeleteTaskId(taskId);
  };

  const handleDeleteTask = (taskId: string) => {
    onDeleteTask(taskId);
    setConfirmDeleteTaskId(null);
  };

  return (
    <div
      className="p-4 bg-gray-100 rounded"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
    >
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isExpanded={expandedTaskId === task.id}
          selectedTags={selectedTags}
          onDragStart={onDragStart}
          onEditTask={onEditTask}
          onDeleteTask={handleDeleteTask}
          onToggleExpand={handleToggleExpand}
          onConfirmDelete={handleDeleteConfirmation}
        />
      ))}
      <button
        className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        onClick={() => onOpenTaskModal()}
      >
        Create Task
      </button>
      <ConfirmModal
        isOpen={!!confirmDeleteTaskId}
        onCancel={() => setConfirmDeleteTaskId(null)}
        onConfirm={() =>
          confirmDeleteTaskId && handleDeleteTask(confirmDeleteTaskId)
        }
      />
    </div>
  );
};

export default TaskColumn;
