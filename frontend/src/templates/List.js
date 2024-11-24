import React from 'react';

const List = () => {
  return (
      <ul className="space-y-2 w-full max-w-md">
          <li  className="py-2 px-4 rounded-lg bg-slate-400 hover:bg-slate-600 focus:ring-2 focus:ring-slate-500 transition-all duration-300 flex justify-between items-center">
            <span className="flex-grow text-lg">test test</span>{// dodělání funkčnosti načtení dat z databáze + přidání funkcí do buttonů + přidání linků do list itemů
            }
            <div className="fflex space-x-2">
              <button
                onClick={() => {
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded px-2 py-1"
                >
                Editovat
              </button>
              <button
                onClick={() => {
                }}
                className="bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1"
              >
                Odstranit
              </button>
            </div>
          </li>
      </ul>
  );
};

export default List;
