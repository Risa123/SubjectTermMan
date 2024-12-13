import React, { useState } from 'react';

const UniversalModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  inputPlaceholder,
  submitButtonText,
  cancelButtonText,
  styleType, // e.g., 'twoinputs', 'oneinput', 'list', 'textarea', 'decision', 'addfile'
  inputType, // e.g., 'password', 'text'
  secondInputType,
  secondInputPlaceholder,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = { inputValue };

    if (styleType === 'twoinputs') {
      submissionData.secondInputValue = secondInputValue;
    }

    if (styleType === 'addfile' && file) {
      submissionData.file = file;
    }

    if (
      inputValue.trim() &&
      (!styleType.includes('twoinputs') || secondInputValue.trim())
    ) {
      onSubmit(submissionData);
      setInputValue('');
      setSecondInputValue('');
      setFile(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <form onSubmit={handleSubmit}>
          {(styleType === 'oneinput' || styleType === 'twoinputs') && (
            <div className="mb-4">
              <label
                htmlFor="universalInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {inputPlaceholder}
              </label>
              <input
                type={inputType}
                id="universalInput"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder={inputPlaceholder}
                required
              />
            </div>
          )}

          {styleType === 'twoinputs' && (
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
          )}

          {styleType === 'textarea' && (
            <div className="mb-4">
              <label
                htmlFor="textareaInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {inputPlaceholder}
              </label>
              <textarea
                id="textareaInput"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder={inputPlaceholder}
                required
              ></textarea>
            </div>
          )}

          {styleType === 'list' && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">List items:</p>
              <ul className="list-disc list-inside">
                {inputValue.split(',').map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter comma-separated items"
                required
              />
            </div>
          )}

          {styleType === 'decision' && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {inputPlaceholder}
              </p>
            </div>
          )}

          {styleType === 'addfile' && (
            <div className="mb-4">
              <label
                htmlFor="fileInput"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Add Attachment
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded"
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
                setFile(null);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2"
            >
              {cancelButtonText}
            </button>
            <button
              type="submit"
              onClick={() => {
                if (styleType === 'decision') onSubmit();
              }}
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

export default UniversalModal;