import React, { useState } from 'react';
import { Task } from '../../types/Task';
import TaskForm from '../TaskForm/TaskForm';
import EditTaskForm from '../EditTaskForm/EditTaskForm';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    taskId: string | undefined,
    title: string,
    tags: string[],
    status: Task['status'],
  ) => void;
  initialTask?: Task;
}

/**
 * TaskModal component for creating and editing tasks in a modal window.
 */
const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialTask,
}) => {
  const [status, setStatus] = useState<Task['status']>(
    initialTask?.status || 'todo',
  );

  const handleCreateSubmit = (title: string, tags: string[]) => {
    onSubmit(undefined, title, tags, status);
    onClose();
  };

  const handleEditSubmit = (taskId: string, title: string, tags: string[]) => {
    onSubmit(taskId, title, tags, status);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="relative w-2/5 p-10 bg-white rounded-lg z-10">
            <button
              type="button"
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900"
              onClick={onClose}
            >
              &times;
            </button>
            <h2 className="mb-2 text-2xl font-bold">
              {initialTask ? 'Edit Task' : 'Create Task'}
            </h2>
            {initialTask ? (
              <EditTaskForm
                task={initialTask}
                onSubmit={handleEditSubmit}
                onCancel={onClose}
              />
            ) : (
              <TaskForm onSubmit={handleCreateSubmit} />
            )}
            <div className="mt-4">
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Status:
              </label>
              <select
                id="status"
                className="block w-full px-3 py-2 text-sm font-bold text-gray-700 border border-gray-300 rounded"
                value={status}
                onChange={(e) => setStatus(e.target.value as Task['status'])}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;
