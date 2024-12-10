import React, { useState, useEffect } from 'react';

// Přidáme prop isAdmin pro rozlišení role uživatele
const AssignmentTaskModal = ({ isAdmin }) => {
  const [isOpen, setOpen] = useState(false);
  const [TaskText, setTaskText] = useState('');
  const [temporaryTaskText, setTemporaryTaskText] = useState('');

  useEffect(() => {
    const savedTaskText = localStorage.getItem('modalTaskText') || '';
    setTaskText(savedTaskText);
    setTemporaryTaskText(savedTaskText);
  }, []);
  

  const handleTaskTextChange = (e) => {
    setTemporaryTaskText(e.target.value);
  };

  const handleSave = () => {
    setTaskText(temporaryTaskText);
    localStorage.setItem('modalTaskText', temporaryTaskText);
    setOpen(false);
  };

  const handleCancel = () => {
    setTemporaryTaskText(TaskText);
    setOpen(false);
  };

  const handleOpen = () => {
    setTemporaryTaskText(TaskText);
    setOpen(true);
  };

  const handleBackgroundClickCancle = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        {isAdmin ? 'Upravit zadání' : 'Zobrazit zadání'}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackgroundClickCancle}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="mb-4">
              <h2 className="text-xl font-bold">
                {isAdmin ? 'Upravit zadání' : 'Zadání'}
              </h2>
            </div>

            {isAdmin ? (
              // Admin vidí editovatelné textové pole
              <textarea
                value={temporaryTaskText}
                onChange={handleTaskTextChange}
                className="w-full min-h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder="Zadejte text zadání..."
              />
            ) : (
              // Student vidí pouze text bez možnosti editace
              <div className="w-full min-h-[100px] p-2 border rounded-md bg-gray-50 mb-4">
                {TaskText || 'Zatím nebylo zadáno žádné zadání.'}
              </div>
            )}

            <div className="flex justify-end space-x-2">
              {isAdmin ? (
                // Tlačítka pro admina
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Zrušit
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Uložit
                  </button>
                </>
              ) : (
                // Tlačítko pro studenta
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Zavřít
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentTaskModal;