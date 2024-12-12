import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './templates/MainPage';
import AllSubjects from './pages/AllSubjects';
import { SubjectProvider } from './templates/SubjectProvider';
import SelectedSubjects from './pages/SelectedSubjects';

const App = () => {
  const userName = "test testovací";
  const allSubjectsPrev = "Seznam všech předmětů";
  const subjectPreview = "Seznam zapsaných předmětů";
  const news = "Novinky";

  return (
    <SubjectProvider>
      <BrowserRouter>
        <MainPage userName={userName} allSubjectsPrev={allSubjectsPrev} subjectPreview={subjectPreview} news={news}/>
        <Routes>
          <Route path="/AllSubjects" element={<AllSubjects />} />
          <Route path="/SelectedSubjects" element={<SelectedSubjects />} />
        </Routes>
      </BrowserRouter>
    </SubjectProvider>
  );
};

export default App;
