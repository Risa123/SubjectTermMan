import { createContext, useState, useEffect } from 'react';
import { post } from "../requestCommon";

export const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const updateSubjectWithTerm = async (subjectId, updatedSubjectTerm) => {
    console.log('updateSubjectWithTerm called with:', subjectId, updatedSubjectTerm);
    setSubjects(subjects.map(subject => {
      if (subject._id === subjectId) {
        return {
          ...subject,
          subjectTerms: subject.subjectTerms.map(term =>
            term._id === updatedSubjectTerm._id ? updatedSubjectTerm : term
          ),
          subjectTerm: updatedSubjectTerm._id
        };
      }
      return subject;
    }));
  };

  const fetchSubjects = async () => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      console.error('No auth token found');
      return;
    }
    try {
      const response = await post('subject/list', {
        authToken: storedToken
      });
      if (response.ok) {
        const data = await response.json();
        const transformedData = data.map(subject => ({
          _id: subject._id,
          name: subject.name,
          credits: subject.credits,
          info: subject.info,
          isClicked: false,
          subjectTerms: subject.subjectTerms || [],
          subjectTerm: subject.subjectTerms?.[0]?._id || null // Použijte _id místo celého objektu
        }));
        setSubjects(transformedData || []);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSignIn = async (subjectId, subjectTerm, studentId) => {
  console.log('handleSignIn called with:', subjectId, subjectTerm, studentId);
  const storedToken = localStorage.getItem('authToken');
  if (!storedToken) {
    console.error('No auth token found');
    return;
  }

  if (!subjectTerm || !subjectTerm._id) {
    console.error('Invalid subjectTerm');
    return;
  }

  if (!studentId) {
    console.error('Invalid studentId');
    return;
  }

  try {
    const response = await post('subjectTerm/signUp', {
      authToken: storedToken,
      subjectTerm: subjectTerm._id,
      studentId: studentId
    });

    if (response.ok) {
      console.log('Server response:', response);
      fetchSubjects(); // Znovu načtěte subjects po úspěšném zápisu
    } else {
      console.error('Error signing up, server responded with:', response.status);
    }
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

  const addNewSubject = async (data) => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      console.error('No auth token found');
      return;
    }

    try {
      const requestBody = {
        authToken: storedToken,
        name: String(data.inputValue).trim(),
        credits: Number(data.secondInputValue),
        info: String(data.thirdInputValue).trim()
      };

      const response = await post('subject/create', requestBody);
      
      if (response.ok) {
        await fetchSubjects();
        setCreateModalOpen(false);
      }
    } catch (error) {
      console.error('Error creating subject:', error);
    }
  };

  const deleteSubject = async (id) => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      console.error('No auth token found');
      return;
    }

    try {
      const response = await post('subject/remove', {
        authToken: storedToken,
        subjectID: id
      });

      if (response.ok) {
        await fetchSubjects();
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const editSubject = async (id, data) => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      console.error('No auth token found');
      return;
    }

    try {
      const response = await post('subject/update', {
        authToken: storedToken,
        subjectID: id,
        name: data.inputValue,
        credits: parseInt(data.secondInputValue),
        info: data.thirdInputValue
      });

      if (response.ok) {
        await fetchSubjects();
      }
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const getSubjects = () => {
    return subjects.map(subject => ({
      id: subject._id,
      name: subject.name,
      credits: subject.credits,
      info: subject.info,
      isClicked: subject.isClicked,
      subjectTerms: subject.subjectTerms, // Přidáváme celé pole subjectTerms
      subjectTerm: subject.subjectTerm // Zachováváme pro zpětnou kompatibilitu
    }));
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        isCreateModalOpen,
        setCreateModalOpen,
        handleSignIn,
        addNewSubject,
        deleteSubject,
        editSubject,
        getSubjects,
        updateSubjectWithTerm // přidáme novou funkci do contextu
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};
