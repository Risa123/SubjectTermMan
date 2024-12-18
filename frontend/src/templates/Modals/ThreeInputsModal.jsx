import React, { useState, useEffect } from 'react';

const ThreeInputsModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  inputPlaceholder,
  secondInputPlaceholder,
  thirdInputPlaceholder,
  submitButtonText,
  cancelButtonText,
  inputType,
  defaultValues
}) => {
  const [inputValue, setInputValue] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');
  const [thirdInputValue, setThirdInputValue] = useState('');

  useEffect(() => {
    if (defaultValues) {
      setInputValue(defaultValues.inputValue);
      setSecondInputValue(defaultValues.secondInputValue);
      setThirdInputValue(defaultValues.thirdInputValue);
    }
  }, [defaultValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && secondInputValue.trim() && thirdInputValue.trim()) {
      onSubmit({
        inputValue: inputValue.trim(),
        secondInputValue: secondInputValue.trim(),
        thirdInputValue: thirdInputValue.trim()
      });
    }
  };

  const handleClose = () => {
    setInputValue('');
    setSecondInputValue('');
    setThirdInputValue('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type={inputType}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={inputPlaceholder}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type={inputType}
              value={secondInputValue}
              onChange={(e) => setSecondInputValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={secondInputPlaceholder}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={thirdInputValue}
              onChange={(e) => setThirdInputValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={thirdInputPlaceholder}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleClose}
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

export default ThreeInputsModal;