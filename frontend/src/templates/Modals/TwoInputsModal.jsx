import React, { useState } from 'react';

const TwoInputsModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  inputPlaceholder,
  secondInputPlaceholder,
  submitButtonText,
  cancelButtonText,
  inputType,
  secondInputType,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && secondInputValue.trim()) {
      onSubmit({ inputValue, secondInputValue });
      setInputValue('');
      setSecondInputValue('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {inputPlaceholder}
            </label>
            <input
              type={inputType}
              id="firstInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={inputPlaceholder}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="secondInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {secondInputPlaceholder}
            </label>
            <input
              type={secondInputType}
              id="secondInput"
              value={secondInputValue}
              onChange={(e) => setSecondInputValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={secondInputPlaceholder}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                setInputValue('');
                setSecondInputValue('');
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2"
            >
              {cancelButtonText}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2"
            >
              {submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwoInputsModal;
