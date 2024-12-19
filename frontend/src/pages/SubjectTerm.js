import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UniversalModal from '../templates/Modals/UniversalModal';
import { post } from '../requestCommon';
import { SubjectContext } from '../templates/SubjectProvider';

const SubjectTerm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const subjectContext = useContext(SubjectContext);

  const handleCreateSubjectTerm = async (data) => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      console.error('No auth token found');
      return;
    }

    try {
      const response = await post('subjectTerm/create', {
        authToken: storedToken,
        name: data.inputValue,
        subject: id,
        teacher: "5e16d5e5-8797-431f-af3c-acce3a537512"
      });

      if (response.ok) {
        const newSubjectTerm = await response.json();
        
        const updateResponse = await post('subject/update', {
          authToken: storedToken,
          subjectID: id,
          subjectTerms: [newSubjectTerm._id]
        });

        if (updateResponse.ok) {
          // Aktualizujeme lokální stav pomocí context funkce
          await subjectContext.updateSubjectWithTerm(id, newSubjectTerm._id);
          setIsModalOpen(false);
          navigate(`/SubjectDetail/${newSubjectTerm._id}`);
        } else {
          console.error('Failed to update subject with new subject term');
        }
      } else {
        const errorText = await response.text();
        console.error('Failed to create subject term:', errorText);
      }
    } catch (error) {
      console.error('Error creating subject term:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Žádný subject term nebyl vytvořen, chcete ho vytvořit?
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
        >
          Vytvořit nový subject term
        </button>
      </div>

      <UniversalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSubjectTerm}
        title="Nový subject term"
        inputPlaceholder="Zadejte název subject termu"
        submitButtonText="Vytvořit"
        cancelButtonText="Zrušit"
        styleType="oneinput"
        inputType="text"
      />
    </div>
  );
};

export default SubjectTerm;