import { createContext, useState, useEffect } from 'react';
import { post } from "../requestCommon";

export const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [enrolledTerms, setEnrolledTerms] = useState([]);  // Nový state

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

  const isTermEnrolled = (termId) => {
    return enrolledTerms.includes(termId);
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
        // Najít zapsané termy
        const enrolled = [];
        data.forEach(subject => {
          if (subject.subjectTerms) {
            subject.subjectTerms.forEach(term => {
              if (term.students?.includes(localStorage.getItem('userId'))) {
                enrolled.push(term._id || term);
              }
            });
          }
        });
        setEnrolledTerms(enrolled);

        const transformedData = data.map(subject => ({
          _id: subject._id,
          name: subject.name,
          credits: subject.credits,
          info: subject.info,
          isClicked: false,
          subjectTerms: subject.subjectTerms || [],
          subjectTerm: subject.subjectTerms?.[0] || null
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

  const handleSignIn = async (subjectTermId) => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      console.error('No auth token found');
      return;
    }
  
    try {
      const response = await post('subjectTerm/signUp', {
        authToken: storedToken,
        subjectTerm: subjectTermId
      });
  
      if (response.ok) {
        setEnrolledTerms(prev => [...prev, subjectTermId]);
        await fetchSubjects();
      } else {
        const errorText = await response.text();
        console.error('Error signing up:', errorText);
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
      subjectTerms: subject.subjectTerms,
      subjectTerm: subject.subjectTerm
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
        updateSubjectWithTerm,
        isTermEnrolled, // přidáno
        enrolledTerms  // přidáno
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};
