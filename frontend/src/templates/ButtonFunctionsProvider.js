import { useState } from 'react';

function FunctionProvider() {
    const [subjects, setSubjects] = useState([]);
    
    const handleClick = (id) => {
        setSubjects(subjects.map(subject => 
          subject.id === id ? { ...subject, isClicked: true } : subject
        ));
      };
  
    const addNewSubject = () => {
      const newSubject = {
        id: Date.now(),
        name: `Předmět ${subjects.length + 1}`
      };
      setSubjects([...subjects, newSubject]);
    };
  
    return { subjects, handleClick, addNewSubject };
  };

export default FunctionProvider;