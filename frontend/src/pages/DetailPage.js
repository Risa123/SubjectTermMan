import React, { useState, useEffect } from 'react';
import ListModal from '../templates/Modals/ListModal';
import StudentAssessment from '../templates/Modals/StudentAssessment';
import UniversalModal from "../templates/Modals/UniversalModal";

const DetailPage = () => {
  const [isListModalOpen, setListModalOpen] = useState(false);
  const [isAssessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
   //const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin');
   // setIsStudent(userRole === 'student');
  }, []);

  const handleAsignmentSubmit = () => {
    console.log('Zadání uloženo pro:', currentItem);
    setModalOpen(false);
  };

  const teachers = [
    'Jan Novák',
    'Petra Svobodová',
    'Tomáš Dvořák',
    'Alena Horáková',
    'Martin Černý',
    'Lucie Veselá',
  ];

  const items = [
    { id: 1, name: 'Item 1', description: 'Popis 1', points: 20 },
    { id: 2, name: 'Item 2', description: 'Popis 2', points: 15 },
    { id: 3, name: 'Item 3', description: 'Popis 3', points: 25 },
    { id: 4, name: 'Item 4', description: 'Popis 4', points: 30 },
    { id: 5, name: 'Item 5', description: 'Popis 5', points: 10 },
  ];

  const [editedItems, setEditedItems] = useState(items);

  const handleTeachersSubmit = (selectedItems) => {
    console.log('Vybraní učitelé:', selectedItems);
    setListModalOpen(false);
  };

  const handleEditChange = (id, field, value) => {
    setEditedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const openModalWithItem = (item) => {
    setCurrentItem(item);
    setModalOpen(true);
  };

  return (
    <div className="p-8 bg-gray-300 h-screen mt-5">
      <h1 className="text-2xl p-2 underline font-bold">Detail předmětu</h1>

      <div className="flex mt-8 h-[calc(100%-5rem)]">
        <div className="w-52 bg-white p-4 rounded-lg shadow-md overflow-auto items-center">
          <h2 className="text-lg font-semibold mb-4">Seznam</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="mb-2">
                {item.name} - {item.points} bodů
              </li>
            ))}
          </ul>
          {isAdmin && (
            <button
              onClick={() => setListModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 transition-all"
            >
              Vybrat učitele
            </button>
          )}
        </div>
        <div className="flex-1 ml-4 bg-white p-4 rounded-lg shadow-md overflow-auto">
          <h2 className="text-lg font-semibold mb-4">Tabulka</h2>

          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">Název</th>
                <th className="border border-gray-300 px-2 py-1">Datum</th>
                <th className="border border-gray-300 px-2 py-1">Zadání</th>
                <th className="border border-gray-300 px-2 py-1">Řešení</th>
              </tr>
            </thead>
            <tbody>
              {editedItems.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-2 py-1">
                    {isAdmin ? (
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleEditChange(item.id, 'name', e.target.value)
                        }
                        className="w-full px-1 py-1 border border-gray-300 rounded text-base"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {isAdmin ? (
                      <input
                        type="date"
                        value={item.date || ''}
                        onChange={(e) =>
                          handleEditChange(item.id, 'date', e.target.value)
                        }
                        className="w-full px-1 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      item.date
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <button
                      onClick={() => openModalWithItem(item)}
                      className="bg-green-500 hover:bg-green-600 text-white rounded px-2 py-1 transition-all duration-300"
                    >
                      Zadání
                    </button>
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <button
                      onClick={() => setAssessmentModalOpen(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1 transition-all"
                    >
                      Řešení
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ListModal
        isOpen={isListModalOpen}
        onClose={() => setListModalOpen(false)}
        onSubmit={handleTeachersSubmit}
        title="Vyberte učitele"
        listItems={teachers}
        submitButtonText="Přidat"
        cancelButtonText="Zrušit"
        multipleChoice="no"
      />

      <UniversalModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAsignmentSubmit}
        title={`Zadání pro ${currentItem?.name}`}
        inputPlaceholder="Zadejte vaše zadání"
        submitButtonText="Přidat"
        cancelButtonText="Zrušit"
        styleType="textarea"
        inputType="text"
        isAdmin={isAdmin}
        storageKey={`assignment_${currentItem?.id}`}
      />

      {isAssessmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-3/4">
            <button
              onClick={() => setAssessmentModalOpen(false)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
            >
              Zavřít
            </button>
            <StudentAssessment />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;