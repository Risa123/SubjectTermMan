import React from 'react';

const DecisionModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  inputPlaceholder,
  submitButtonText,
  cancelButtonText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-sm text-gray-700 mb-6">{inputPlaceholder}</p>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2"
          >
            {cancelButtonText}
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2"
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecisionModal;
