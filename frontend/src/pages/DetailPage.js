import React, { useState } from 'react';
import List from '../templates/List';
import ListModal from '../templates/Modals/ListModal';
import StudentAssessment from '../templates/Modals/StudentAssessment';

const DetailPage = () => {
  const [isListModalOpen, setListModalOpen] = useState(false);
  const [isAssessmentModalOpen, setAssessmentModalOpen] = useState(false);

  const teachers = [
    'Jan Novák',
    'Petra Svobodová',
    'Tomáš Dvořák',
    'Alena Horáková',
    'Martin Černý',
    'Lucie Veselá',
  ];

  const handleTeachersSubmit = (selectedItems) => {
    console.log('Vybraní učitelé:', selectedItems);
    setListModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-300 h-screen mt-5">
      <h1 className="text-2xl p-2 underline font-bold">Detail předmětu</h1>
      <List route="/SubjectDetail" />

      <div className="mt-4">
        <button
          onClick={() => setListModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2 transition-all"
        >
          Vybrat učitele
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setAssessmentModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 transition-all"
        >
          Zobrazit hodnocení studentů
        </button>
      </div>

      <ListModal
        isOpen={isListModalOpen}
        onClose={() => setListModalOpen(false)}
        onSubmit={handleTeachersSubmit}
        title="Vyberte učitele"
        listItems={teachers}
        submitButtonText="Přidat"
        cancelButtonText="Zrušit"
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
