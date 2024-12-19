import React, { useState } from 'react';

const ListModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  listItems = [],
  submitButtonText,
  cancelButtonText,
  multipleChoice
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (item) => {
    if (multipleChoice === "yes") {
      // Pro více výběrů - přidá nebo odebere položku
      setSelectedItems((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    } else {
      // Pro jeden výběr - nahradí celý výběr novou položkou
      setSelectedItems([item]);
    }
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
                className={`py-2 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                  selectedItems.includes(item) 
                    ? 'bg-green-200 hover:bg-green-300' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 border rounded-${multipleChoice === "yes" ? "sm" : "full"} flex items-center justify-center ${
                    selectedItems.includes(item) ? 'bg-green-500 border-green-500' : 'border-gray-400'
                  }`}>
                    {selectedItems.includes(item) && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                  <span>{item}</span>
                </div>
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
            disabled={selectedItems.length === 0}
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListModal;