import React, { useState, useEffect } from 'react';

// Přidáme prop isAdmin pro rozlišení role uživatele
const AssignmentHandInModal = ({ isAdmin }) => {
  const [isOpen, setOpen] = useState(false);
  const [HandInText, setHandInText] = useState('');
  const [temporaryHandInText, setTemporaryHandInText] = useState('');

  useEffect(() => {
    const savedHandInText = localStorage.getItem('modalHandInText') || '';
    setHandInText(savedHandInText);
    setTemporaryHandInText(savedHandInText);
  }, []);
  

  const handleHandInTextChange = (e) => {
    setTemporaryHandInText(e.target.value);
  };

  const handleSave = () => {
    setHandInText(temporaryHandInText);
    localStorage.setItem('modalHandInText', temporaryHandInText);
    setOpen(false);
  };

  const handleCancel = () => {
    setTemporaryHandInText(HandInText);
    setOpen(false);
  };

  const handleOpen = () => {
    setTemporaryHandInText(HandInText);
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
        {isAdmin ? 'Zobrazit úkol' : 'Odevzdat úkol'}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackgroundClickCancle}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="mb-4">
              <h2 className="text-xl font-bold">
                {isAdmin ? 'Úkol studenta' : 'Odevzdat úkol'}
              </h2>
            </div>

            {!isAdmin ? (
                // Student vidí editovatelné textové pole
                <textarea
                    value={temporaryHandInText}
                    onChange={handleHandInTextChange}
                    className="w-full min-h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    placeholder="Zadejte text zadání..."
                />
            ) : (
              // Admin vidí pouze text bez možnosti editace
              <div className="w-full min-h-[100px] p-2 border rounded-md bg-gray-50 mb-4">
                {HandInText || 'Zatím nebylo zadáno žádné zadání.'}
              </div>
            )}

            <div className="flex justify-end space-x-2">
              {!isAdmin ? (
                // Tlačítka pro studenta
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
                    Odevzdat
                  </button>
                </>
              ) : (
                // Tlačítko pro admina
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

export default AssignmentHandInModal;