import { useState } from 'react';

function FunctionProvider() {
    const [subjects, setSubjects] = useState([]);
    
    const handleClick = (id) => {
        setSubjects(subjects.map(item => 
          item.id === id ? { ...item, isClicked: true } : item
        ));
      };
  
    const addNewSubject = () => {
      const newItem = {
        id: Date.now(),
        name: `Předmět ${subjects.length + 1}`
      };
      setSubjects([...subjects, newItem]);
    };
  
    return { subjects, handleClick, addNewSubject };
  };

export default FunctionProvider;