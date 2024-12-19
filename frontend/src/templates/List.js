import React, { useContext, useState, useEffect } from 'react';
import { SubjectContext } from './SubjectProvider';
import UniversalModal from './Modals/UniversalModal';
import { useNavigate } from "react-router-dom";

const List = () => {
  const subjectContext = useContext(SubjectContext);
  const subjects = subjectContext.getSubjects();
  const navigate = useNavigate();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentEditSubject, setCurrentEditSubject] = useState(null);
  const [currentDeleteSubject, setCurrentDeleteSubject] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin');
    setIsStudent(userRole === 'student');
  }, []);

  const handleOpenEditModal = (subject) => {
    setCurrentEditSubject({
      id: subject.id,
      inputValue: subject.name,
      secondInputValue: subject.credits?.toString() || '',
      thirdInputValue: subject.info || ''
    });
    setEditModalOpen(true);
  };

  const handleOpenDeleteModal = (subject) => {
    setCurrentDeleteSubject(subject);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentDeleteSubject) {
      subjectContext.deleteSubject(currentDeleteSubject.id);
    }
    setDeleteModalOpen(false);
    setCurrentDeleteSubject(null);
  };

  const navigateToDetail = (subject) => {
    if (subject.subjectTerms && subject.subjectTerms.length > 0) {
      navigate(`/SubjectDetail/${subject.subjectTerms[0]}`);
    } else {
      navigate(`/SubjectTerms/${subject.id}`);
    }
  };
  const handleEditSubmit = (data) => {
    if (currentEditSubject) {
      subjectContext.editSubject(currentEditSubject.id, data);
    }
    setEditModalOpen(false);
    setCurrentEditSubject(null);
  };

  return (
    <>
      <ul className="space-y-2 w-full max-w-md">
        {subjects.map((subject) => (
          <li
            key={subject.id}
            className="py-2 px-4 rounded-lg bg-slate-400 hover:bg-slate-600 transition-all flex justify-between items-center cursor-pointer"
          >
            <div 
              className="flex-grow"
              onClick={() => navigateToDetail(subject)}
            >
              <span className="text-lg">{subject.name}</span>
            </div>
            <div className="flex space-x-2">
              {isAdmin && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditModal(subject);
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDeleteModal(subject);
                    }}
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
                </>
              )}
              {isStudent && subject.subjectTerms.map(term => (
                <button
                key={term._id}
                onClick={(e) => {
                  e.stopPropagation();
                  const studentId = localStorage.getItem('studentId');
                  subjectContext.handleSignIn(term._id, term, studentId);  // Předejte term._id místo subject.id
                }}
                  className={`rounded px-2 py-1 text-white ${
                    term.students?.includes(/* student ID */) // check if student is already signed up
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } transition-all duration-300`}
                  disabled={term.students?.includes(/* student ID */)}
                >
                  {term.students?.includes(/* student ID */) ? 'Zapsáno' : 'Zapsat'}
                </button>
              ))}
            </div>
          </li>
        ))}
        <div className="flex justify-center items-center">
          {isAdmin && (
            <button
              onClick={() => subjectContext.setCreateModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white rounded px-2 py-1 w-48 max-w-full sm:mx-auto sm:w-48 transition-all duration-300"
            >
              Vytvořit nový předmět
            </button>
          )}
        </div>
      </ul>

      <UniversalModal
        isOpen={subjectContext.isCreateModalOpen}
        onClose={() => subjectContext.setCreateModalOpen(false)}
        onSubmit={subjectContext.addNewSubject}
        title="Nový předmět"
        inputPlaceholder="Zadejte název předmětu"
        secondInputPlaceholder="Zadejte počet kreditů"
        thirdInputPlaceholder="Zadejte popis předmětu"
        submitButtonText="Vytvořit"
        cancelButtonText="Zrušit"
        styleType="threeinputs"
        inputType="text"
      />

      <UniversalModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        title="Upravit předmět"
        inputPlaceholder="Zadejte nový název předmětu"
        secondInputPlaceholder="Zadejte nový počet kreditů"
        thirdInputPlaceholder="Zadejte nový popis předmětu"
        submitButtonText="Uložit"
        cancelButtonText="Zrušit"
        styleType="threeinputs"
        inputType="text"
        defaultValues={{
          inputValue: currentEditSubject?.inputValue || '',
          secondInputValue: currentEditSubject?.secondInputValue || '',
          thirdInputValue: currentEditSubject?.thirdInputValue || ''
        }}
      />

      <UniversalModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setCurrentDeleteSubject(null);
        }}
        onSubmit={handleConfirmDelete}
        title="Smazat předmět"
        inputPlaceholder={`Opravdu chcete smazat předmět "${currentDeleteSubject?.name}"?`}
        submitButtonText="Smazat"
        cancelButtonText="Zrušit"
        styleType="decision"
      />
    </>
  );
};

export default List;