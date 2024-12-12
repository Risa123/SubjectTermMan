import { createContext, useState } from 'react';

export const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleSignIn = (id) => {
    setSubjects(subjects.map(subject =>
      subject.id === id ? { ...subject, isClicked: true } : subject
    ));
  };

  const addNewSubject = (subjectName) => {
    const newSubject = {
      id: Date.now(),
      name: subjectName,
      isClicked: false
    };
    setSubjects([...subjects, newSubject]);
    setCreateModalOpen(false);
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
      id: subject.id,
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