import React from 'react';
import List from '../templates/List';

const AllSubjects = () => {
    const items = "aaa"
    
  return (
    <div className='p-8 bg-gray-300 h-screen mt-5'>
    <h1 className='text-2xl p-2 underline font-bold'>Seznam všech předmětů</h1>
    <List
        items={items}
        // onRemoveItem={confirmRemoveItem}
        // onClick={goToDetail}
        // onEditItem={handleEditItem}
      />
    </div>
  );
};

export default AllSubjects;