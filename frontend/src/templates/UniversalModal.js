import React, { useState } from 'react';

const UniversalModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  inputPlaceholder,
  submitButtonText,
  cancelButtonText,
  twoInputs,
  secondInputPlaceholder,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && (!twoInputs || secondInputValue.trim())) {
      onSubmit(twoInputs ? { inputValue, secondInputValue } : inputValue);
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
              htmlFor="universalInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
             
            </label>
            <input
              type="text"
              id="universalInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={inputPlaceholder}
              required
            />
          </div>

          {twoInputs && (
            <div className="mb-4">
              <label
                htmlFor="secondInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
            
              </label>
              <input
                type="password"
                id="secondInput"
                value={secondInputValue}
                onChange={(e) => setSecondInputValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={secondInputPlaceholder}
                required
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                setInputValue('');
                setSecondInputValue('');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              {cancelButtonText}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UniversalModal;
