import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './templates/MainPage';
import AllSubjects from './pages/AllSubjects';
const App = () => {
  const userName = "test testovací";
  const b1 = "Seznam všech předmětů";
  const b2 = "Seznam zapsaných předmětů";
  const b3 = "Novinky";

  return (
    <BrowserRouter>
    <MainPage userName={userName} b1={b1} b2={b2} b3={b3}/>
      <Routes>
        <Route path="/" element={<AllSubjects />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
