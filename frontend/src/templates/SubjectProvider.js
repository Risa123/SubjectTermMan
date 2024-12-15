import { createContext, useState, useEffect } from 'react';
import { post } from "../requestCommon";

export const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
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
          setSubjects(data || []);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  const handleSignIn = (id) => {
    setSubjects(subjects.map(subject =>
      subject.id === id ? { ...subject, isClicked: true } : subject
    ));
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
        const listResponse = await post('subject/list', { authToken: storedToken });
        if (listResponse.ok) {
          const updatedData = await listResponse.json();
          setSubjects(updatedData || []);
        }
        setCreateModalOpen(false);
      } else {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error details:', error);
    }
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const editSubject = (id, updatedSubject) => {
    setSubjects(subjects.map(subject =>
      subject.id === id ? { ...subject, ...updatedSubject } : subject
    ));
  };

  const getSubjects = () => {
    return subjects.map(subject => ({
      id: subject._id,
      name: subject.name,
      isClicked: subject.isClicked
    }));
  };
  return (
    <SubjectContext.Provider value={{
      getSubjects,
      handleSignIn,
      addNewSubject,
      isCreateModalOpen,
      deleteSubject,
      editSubject,
      setCreateModalOpen

    }}>
      {children}
    </SubjectContext.Provider>
  );
};