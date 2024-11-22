import React, { useState } from "react";
import logo from "../icons/Triton_logo_Project_management.png";

const MainPage = ({ userName,  b1, b2, b3}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
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

        <div className="absolute bottom-0 right-4 p-2 bg-gray-200 text-sm ">
          Jméno uživatele: {userName}
        </div>
      </header>

      <button
        onClick={toggleDropdown}
        className="p-3 w-full h-[15px] bg-gray-200 text-white flex items-center px-4 hover:bg-gray-300 transition-all duration-300"
      >
        <div className="mr-4 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
        </button>

      {isDropdownOpen && (
        <div className="w-full h-[45px] mt-3 bg-transparent flex justify-around items-center">
          <button className="w-80 h-full bg-gray-200 text-black text-lg font-semibold hover:bg-gray-300 border-solid border-white border-2 rounded-md">
            {b1}
          </button>
          <button className="w-80 h-full bg-gray-200 text-black text-lg font-semibold hover:bg-gray-300 border-solid border-white border-2 rounded-md">
            {b2}
          </button>
          <button className="w-80 h-full bg-gray-200 text-black text-lg font-semibold hover:bg-gray-300 border-solid border-white border-2 rounded-md">
            {b3}
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
