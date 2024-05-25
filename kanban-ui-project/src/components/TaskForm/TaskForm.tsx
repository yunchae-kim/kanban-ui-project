import React, { useState } from 'react';

interface TaskFormProps {
  onSubmit: (title: string, tags: string[]) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, tags);
    setTitle('');
    setTags([]);
    setTagInput('');
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag !== '') {
      if (tags.includes(trimmedTag)) {
        setShowDuplicateWarning(true);
      } else {
        setTags([...tags, trimmedTag]);
        setTagInput('');
      }
    }
  };

  const handleCloseDuplicateWarning = () => {
    setShowDuplicateWarning(false);
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
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
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="tags"
        >
          Tags
        </label>
        <div className="flex">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tags"
            type="text"
            placeholder="Enter tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3"
            onClick={handleAddTag}
          >
            Add
          </button>
        </div>
        <div className="mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block items-center rounded-full mb-1 px-3 text-xs font-semibold mr-2 py-2 bg-gray-200 text-gray-700"
            >
              {tag}
              <button
                type="button"
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={() => handleRemoveTag(tag)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        {showDuplicateWarning && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-2 font-medium w-2/3 inline-block">
            <p>Duplicate tag already exists!</p>
            <button
              className="mt-2 px-4 py-1 bg-red-500 text-white rounded font-bold"
              onClick={handleCloseDuplicateWarning}
            >
              Close
            </button>
          </div>
        )}
      </div>
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
