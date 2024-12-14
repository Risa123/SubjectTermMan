import React, { useState } from 'react';

const ListModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  listItems = [],
  submitButtonText,
  cancelButtonText,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedItems);
    setSelectedItems([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-4 max-h-60 overflow-y-auto">
          <ul className="space-y-2">
            {listItems.map((item, index) => (
              <li
                key={index}
                className={`py-2 px-4 rounded-lg cursor-pointer ${
                  selectedItems.includes(item) ? 'bg-green-200' : 'bg-gray-200'
                }`}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              setSelectedItems([]);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2"
          >
            {cancelButtonText}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2"
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListModal;
