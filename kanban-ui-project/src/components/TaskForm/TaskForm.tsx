import React, { useState } from 'react';
import TagManager from '../TagManager/TagManager';

interface TaskFormProps {
  onSubmit: (title: string, tags: string[]) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
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
    onSubmit(title, tags);
    setTitle('');
    setTags([]);
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
          Create Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
