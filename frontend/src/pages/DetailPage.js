import React, { useState } from 'react';
import List from '../templates/List';
import ListModal from '../templates/Modals/ListModal';

const DetailPage = () => {
  const [isListModalOpen, setListModalOpen] = useState(false);

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

      <ListModal
        isOpen={isListModalOpen}
        onClose={() => setListModalOpen(false)}
        onSubmit={handleTeachersSubmit}
        title="Vyberte učitele"
        listItems={teachers}         
        submitButtonText="Přidat"
        cancelButtonText="Zrušit"
      />
    </div>
  );
};

export default DetailPage;
