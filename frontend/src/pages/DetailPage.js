import React from 'react';
import List from '../templates/List';

const DetailPage = () => {
    
  
  return (
    <div className='p-8 bg-gray-300 h-screen mt-5'>
      <h1 className='text-2xl p-2 underline font-bold'>Detail předmětu</h1>
      <List route="/SubjectDetail"/>
    </div>
  );
};

export default DetailPage;