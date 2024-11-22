import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <header className="flex justify-between items-center bg-slate-100 p-4 shadow-md">
        <h1 className="text-3xl font-bold">Triton university</h1>        
      </header>
      <main className="p-4">

        <Routes>
 
        </Routes>
      </main>
      
    </BrowserRouter>
  );
};

export default App;
