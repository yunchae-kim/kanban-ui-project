import React, { useState } from 'react';
import { Task } from '../../types/Task';
import TagManager from '../TagManager/TagManager';

interface EditTaskFormProps {
  task: Task;
  onSubmit: (taskId: string, title: string, tags: string[]) => void;
  onCancel: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(task.title);
  const [tags, setTags] = useState(task.tags);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  const handleAddTag = (tag: string) => {
    if (tags.includes(tag)) {
      setShowDuplicateWarning(true);
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleCloseDuplicateWarning = () => {
    setShowDuplicateWarning(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task.id, title, tags);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <TagManager
        tags={tags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        showDuplicateWarning={showDuplicateWarning}
        onCloseDuplicateWarning={handleCloseDuplicateWarning}
      />
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
