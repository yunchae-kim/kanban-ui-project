import React, { useState } from 'react';

interface TagSelectorProps {
  tags: string[];
  selectedTags: string[];
  onSelectTag: (tag: string) => void;
  onCreateTag: (tag: string) => void;
}

/**
 * TagSelector component for selecting and creating tags.
 */
const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  selectedTags,
  onSelectTag,
  onCreateTag,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filtered tags based on input value and selected tags
  const filteredTags = tags.filter(
    (tag) =>
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTags.includes(tag),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSelectTag = (tag: string) => {
    onSelectTag(tag);
    setInputValue('');
    setIsDropdownOpen(false);
  };

  const handleCreateTag = () => {
    if (inputValue.trim() !== '') {
      onCreateTag(inputValue.trim());
      setInputValue('');
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setIsDropdownOpen(false)}
        placeholder="Type to select or create a tag"
      />
      {isDropdownOpen && (
        <ul className="absolute w-full py-1 mt-1 text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {filteredTags.map((tag) => (
            <li
              key={tag}
              className="relative py-2 pl-3 pr-9 text-gray-700 cursor-default select-none hover:bg-blue-600 hover:text-white"
              onClick={() => handleSelectTag(tag)}
            >
              {tag}
            </li>
          ))}
          {inputValue.trim() !== '' && (
            <li
              className="relative py-2 pl-3 pr-9 text-gray-700 cursor-default select-none hover:bg-blue-600 hover:text-white"
              onClick={handleCreateTag}
            >
              Create "{inputValue}"
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TagSelector;
