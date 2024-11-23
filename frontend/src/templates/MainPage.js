import React, { useState } from "react";
import logo from "../icons/Triton_logo_Project_management.png";

const MainPage = ({ userName, allSubjectsPrev, subjectPreview, news }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
  };

  return (
    <div>
      <header className="w-full h-44 bg-gray-100 flex flex-col items-center p-5 border-b-2 border-solid border-gray-400 relative">
        <div className="w-full flex justify-between items-center px-8">
          <div className="w-36 h-36 p-2">
            <img
              src={logo}
              alt="Triton Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            Triton University
          </h1>
          <button className="w-28 h-10 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 absolute top-4 right-4">
            Login / Logout
          </button>
        </div>
        <div className="absolute bottom-0 right-4 p-2 bg-gray-200 text-sm">
          Jméno uživatele: {userName}
        </div>
      </header>

      <button
        onClick={toggleDropdown}
        className="p-3 w-full h-[15px] bg-gray-200 text-white flex items-center px-4 hover:bg-gray-300 transition-all duration-300"
      >
        <div className="mr-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-down"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>

      {isDropdownOpen && (
        <div className="w-full flex justify-between gap-4 mt-3 px-8">
          {/* Button Section */}
          <div className="flex w-1/2 gap-4">
            <button className="flex-1 h-16 bg-gray-200 text-black text-lg font-semibold hover:bg-gray-300 border border-white rounded-md">
              {allSubjectsPrev}
            </button>
            <button className="flex-1 h-16 bg-gray-200 text-black text-lg font-semibold hover:bg-gray-300 border border-white rounded-md">
              {subjectPreview}
            </button>
          </div>

          {/* Slider Section */}
          <div className="w-1/2 h-16 bg-gray-200 rounded-md p-4 flex items-center justify-between relative">
  {/* Nadpis a text na jednom řádku */}
  <div className="flex items-center gap-4">
    <h2 className="text-lg font-bold">Novinky:</h2>
    <p className="text-gray-800">{news[currentSlide]}</p>
  </div>

  {/* Navigační tlačítka */}
  <div className="flex gap-2">
    <button
      onClick={prevSlide}
      className="w-8 h-8 bg-gray-400 rounded-full text-white flex items-center justify-center hover:bg-gray-500"
    >
      ◀
    </button>
    <button
      onClick={nextSlide}
      className="w-8 h-8 bg-gray-400 rounded-full text-white flex items-center justify-center hover:bg-gray-500"
    >
      ▶
    </button>
  </div>
</div>
          </div>
      )}
    </div>
  );
};

export default MainPage;
