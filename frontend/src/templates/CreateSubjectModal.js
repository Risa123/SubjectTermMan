import React, { useState } from 'react';

const SubjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [subjectName, setSubjectName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subjectName.trim()) {
      onSubmit(subjectName);
      setSubjectName('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Nový předmět</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700 mb-1">
            </label>
            <input
              type="text"
              id="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Zadejte název předmětu"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                setSubjectName('');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Zrušit
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Vytvořit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;