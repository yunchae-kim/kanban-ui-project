import React, { useState } from 'react';
import TaskColumn from '../TaskColumn/TaskColumn';
import { Task } from '../../types/Task';
import TaskModal from '../TaskModal/TaskModal';
import ToggleOffIcon from '../../assets/icons/toggle-off.png';
import ToggleOnIcon from '../../assets/icons/toggle-on.png';

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hiddenColumns, setHiddenColumns] = useState<
    Record<Task['status'], boolean>
  >({
    todo: false,
    'in-progress': false,
    done: false,
  });

  const handleCreateTask = (
    taskId: string | undefined,
    title: string,
    tags: string[],
    status: Task['status'],
  ) => {
    if (taskId) {
      handleUpdateTask(taskId, title, tags, status);
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        tags,
        status,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleUpdateTask = (
    taskId: string,
    title: string,
    tags: string[],
    status: Task['status'],
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title, tags, status } : task,
    );
    setTasks(updatedTasks);
    setSelectedTaskId(null);
  };

  const handleOpenTaskModal = (taskId?: string) => {
    setSelectedTaskId(taskId || null);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setSelectedTaskId(null);
    setIsTaskModalOpen(false);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string,
  ) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    status: Task['status'],
  ) => {
    const taskId = e.dataTransfer.getData('text');
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task,
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId: string) => {
    handleOpenTaskModal(taskId);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleColumnVisibility = (status: Task['status']) => {
    setHiddenColumns((prevState) => ({
      ...prevState,
      [status]: !prevState[status],
    }));
  };

  const filteredTasks =
    selectedTags.length > 0
      ? tasks.filter((task) =>
          task.tags.some((tag) => selectedTags.includes(tag)),
        )
      : tasks;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
      <div className="mb-4 flex items-center justify-center">
        <div className="mr-4 font-bold">Show Columns:</div>
        {(['todo', 'in-progress', 'done'] as Task['status'][]).map((status) => {
          const statusLabels = {
            todo: 'To Do',
            'in-progress': 'In Progress',
            done: 'Done',
          };

          return (
            <div key={status} className="flex items-center mr-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!hiddenColumns[status]}
                  onChange={() => toggleColumnVisibility(status)}
                  className="sr-only"
                />
                <span className="mr-3 ml-3 text-gray-700 font-bold">
                  {statusLabels[status]}
                </span>
                <img
                  src={hiddenColumns[status] ? ToggleOffIcon : ToggleOnIcon}
                  alt={`Toggle ${status}`}
                  className="w-8 h-8"
                />
              </label>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <h2 className="text-sl font-bold mb-2">Filter by Tags:</h2>
        <div>
          {Array.from(new Set(tasks.flatMap((task) => task.tags))).map(
            (tag) => (
              <button
                key={tag}
                className={`inline-block px-3 py-2 rounded-full text-sm font-semibold mr-2 mb-2 ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </button>
            ),
          )}
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {!hiddenColumns.todo && (
          <TaskColumn
            title="To Do"
            tasks={filteredTasks.filter((task) => task.status === 'todo')}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            status="todo"
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            selectedTags={selectedTags}
            onOpenTaskModal={handleOpenTaskModal}
          />
        )}
        {!hiddenColumns['in-progress'] && (
          <TaskColumn
            title="In Progress"
            tasks={filteredTasks.filter(
              (task) => task.status === 'in-progress',
            )}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            status="in-progress"
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            selectedTags={selectedTags}
            onOpenTaskModal={handleOpenTaskModal}
          />
        )}
        {!hiddenColumns.done && (
          <TaskColumn
            title="Done"
            tasks={filteredTasks.filter((task) => task.status === 'done')}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            status="done"
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            selectedTags={selectedTags}
            onOpenTaskModal={handleOpenTaskModal}
          />
        )}
      </div>
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        onSubmit={handleCreateTask}
        initialTask={
          selectedTaskId
            ? tasks.find((task) => task.id === selectedTaskId)
            : undefined
        }
      />
    </div>
  );
};

export default KanbanBoard;
