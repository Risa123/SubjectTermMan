import React, { useContext, useState } from 'react';
import { SubjectContext } from './SubjectProvider';
import UniversalModal from './UniversalModal';

const List = () => {
  const subjectContext = useContext(SubjectContext);
  const subjects = subjectContext.getSubjects();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentEditSubject, setCurrentEditSubject] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleOpenEditModal = (subject) => {
    setCurrentEditSubject(subject);
    setInputValue(subject.name);
    setEditModalOpen(true);
  };

  const handleEditSubmit = (newName) => {
    if (currentEditSubject) {
      subjectContext.editSubject(currentEditSubject.id, newName);
    }
    setEditModalOpen(false);
    setCurrentEditSubject(null);
    setInputValue('');
  };

  return (
    <>
      <ul className="space-y-2 w-full max-w-md">
        {subjects.map((subject) => (
          <li
            key={subject.id}
            className="py-2 px-4 rounded-lg bg-slate-400 hover:bg-slate-600 transition-all flex justify-between items-center"
          >
            <span className="flex-grow text-lg">{subject.name}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleOpenEditModal(subject)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-2 py-1 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-edit-2"
                >
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </button>
              <button
                onClick={() => subjectContext.deleteSubject(subject.id)}
                className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-trash-2"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
              <button
                onClick={() => subjectContext.handleSignIn(subject.id)}
                className={`rounded px-2 py-1 text-white ${
                  subject.isClicked
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {subject.isClicked ? 'Byl jsi zapsán do předmětu' : 'Zapsat'}
              </button>
            </div>
          </li>
        ))}
        <div className="flex justify-center items-center">
          <button
            onClick={() => subjectContext.setCreateModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white rounded px-2 py-1 w-48 max-w-full sm:mx-auto sm:w-48 transition-all duration-300"
          >
            Vytvořit nový předmět
          </button>
        </div>
      </ul>

      <UniversalModal
        isOpen={subjectContext.isCreateModalOpen}
        onClose={() => subjectContext.setCreateModalOpen(false)}
        onSubmit={(data) => subjectContext.addNewSubject(data.inputValue)}
        title="Nový předmět"
        inputPlaceholder="Zadejte název předmětu"
        submitButtonText="Vytvořit"
        cancelButtonText="Zrušit"
        styleType="oneinput"
        inputType="text"
      />

      <UniversalModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={(data) => handleEditSubmit(data.inputValue)}
        title="Upravit předmět"
        inputPlaceholder="Zadejte nový název předmětu"
        submitButtonText="Uložit"
        cancelButtonText="Zrušit"
        styleType="oneinput"
        inputType="text"
      />
    </>
  );
};

export default List;
