import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './templates/MainPage';
import AllSubjects from './pages/AllSubjects';
const App = () => {
  const userName = "test testovací";
  const allSubjectsPrev = "Seznam všech předmětů";
  const subjectPreview = "Seznam zapsaných předmětů";
  const news = "Novinky";

  return (
    <BrowserRouter>
    <MainPage userName={userName} allSubjectsPrev={allSubjectsPrev} subjectPreview={subjectPreview} news={news}/>
      <Routes>
        <Route path="/" element={<AllSubjects />} />{// Zde je potřeba podmínka pro zbrazení všech předmětů. nebo zobrazení již přidaných předmětů.
        }
      </Routes>
    </BrowserRouter>
  );
};

export default App;
