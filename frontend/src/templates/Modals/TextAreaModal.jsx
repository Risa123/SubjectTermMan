import React, { useState, useEffect } from 'react';

const TextAreaModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  inputPlaceholder,
  submitButtonText,
  cancelButtonText,
  isAdmin = true,
  defaultValue = '',
  storageKey = null
}) => {
  const [inputValue, setInputValue] = useState('');
  const [temporaryValue, setTemporaryValue] = useState('');

  useEffect(() => {
    if (storageKey) {
      const savedValue = localStorage.getItem(storageKey) || defaultValue;
      setInputValue(savedValue);
      setTemporaryValue(savedValue);
    } else {
      setInputValue(defaultValue);
      setTemporaryValue(defaultValue);
    }
  }, [storageKey, defaultValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (temporaryValue.trim()) {
      if (storageKey) {
        localStorage.setItem(storageKey, temporaryValue);
      }
      setInputValue(temporaryValue);
      onSubmit({ inputValue: temporaryValue });
    }
  };

  const handleCancel = () => {
    setTemporaryValue(inputValue);
    onClose();
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="textareaInput"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {inputPlaceholder}
            </label>
            {isAdmin ? (
              <textarea
                id="textareaInput"
                value={temporaryValue}
                onChange={(e) => setTemporaryValue(e.target.value)}
                className="w-full min-h-[100px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={inputPlaceholder}
                required
              />
            ) : (
              <div className="w-full min-h-[100px] p-2 border rounded-md bg-gray-50">
                {inputValue || 'Zatím nebylo zadáno žádné zadání.'}
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            {isAdmin ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
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
              </>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2"
              >
                Zavřít
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextAreaModal;