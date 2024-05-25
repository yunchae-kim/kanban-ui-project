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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="bg-white rounded-lg p-10 z-10 w-2/5 relative">
            <button
              type="button"
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900"
              onClick={onClose}
            >
              &times;
            </button>
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
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Status:
              </label>
              <select
                id="status"
                className="w-full border border-gray-300 rounded px-3 py-2 block text-gray-700 text-sm font-bold"
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
