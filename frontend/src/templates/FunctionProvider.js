import { useState } from 'react';

function FunctionProvider() {
    const [items, setItems] = useState([]);
    const [isClicked] = useState(false);
  
    const handleClick = (id) => {
        setItems(items.map(item => 
          item.id === id ? { ...item, isClicked: true } : item
        ));
      };
  
    const addNewSubject = () => {
      const newItem = {
        id: Date.now(),
        name: `Předmět ${items.length + 1}`
      };
      setItems([...items, newItem]);
    };
  
    return { items, isClicked, handleClick, addNewSubject };
  };

export default FunctionProvider;