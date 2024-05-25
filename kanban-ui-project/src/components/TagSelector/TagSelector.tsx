import React, { useState } from 'react';

interface TagSelectorProps {
  tags: string[];
  selectedTags: string[];
  onSelectTag: (tag: string) => void;
  onCreateTag: (tag: string) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  selectedTags,
  onSelectTag,
  onCreateTag,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setIsDropdownOpen(false)}
        placeholder="Type to select or create a tag"
      />
      {isDropdownOpen && (
        <ul className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {filteredTags.map((tag) => (
            <li
              key={tag}
              className="text-gray-700 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-600 hover:text-white"
              onClick={() => handleSelectTag(tag)}
            >
              {tag}
            </li>
          ))}
          {inputValue.trim() !== '' && (
            <li
              className="text-gray-700 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-600 hover:text-white"
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
