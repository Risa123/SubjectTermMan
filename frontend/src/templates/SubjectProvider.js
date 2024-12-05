import { useState } from 'react';

function FunctionProvider() {
    const [subjects, setSubjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
   
    const handleClick = (id) => {
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
      setIsModalOpen(false);
    };
 
    return { 
      subjects, 
      handleClick, 
      addNewSubject,
      isModalOpen,
      setIsModalOpen
    };
};

export default FunctionProvider;