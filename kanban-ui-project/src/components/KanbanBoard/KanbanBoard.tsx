import React, { useState } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import TaskColumn from '../TaskColumn/TaskColumn';
import { Task } from '../../types/Task';
import EditTaskForm from '../EditTaskForm/EditTaskForm';

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCreateTask = (title: string, tags: string[]) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      tags,
      status: 'todo',
    };
    setTasks([...tasks, newTask]);
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
    setEditingTaskId(taskId);
  };

  const handleUpdateTask = (taskId: string, title: string, tags: string[]) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title, tags } : task,
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
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

  const filteredTasks =
    selectedTags.length > 0
      ? tasks.filter((task) =>
          task.tags.some((tag) => selectedTags.includes(tag)),
        )
      : tasks;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
      {editingTaskId ? (
        <EditTaskForm
          task={tasks.find((task) => task.id === editingTaskId)!}
          onSubmit={handleUpdateTask}
          onCancel={handleCancelEdit}
        />
      ) : (
        <TaskForm onSubmit={handleCreateTask} />
      )}
      <div className="mt-4">
        <h2 className="text-sl font-bold mb-2">Filter by Tags:</h2>
        <div>
          {Array.from(new Set(tasks.flatMap((task) => task.tags))).map(
            (tag) => (
              <button
                key={tag}
                className={`px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2 ${
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
        />
        <TaskColumn
          title="In Progress"
          tasks={filteredTasks.filter((task) => task.status === 'in-progress')}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          status="in-progress"
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          selectedTags={selectedTags}
        />
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
        />
      </div>
    </div>
  );
};

export default KanbanBoard;
