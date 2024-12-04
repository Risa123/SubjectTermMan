import React from 'react';
import FunctionProvider from './FunctionProvider';

const List = () => {
  const { items, handleClick, addNewSubject } = FunctionProvider();

  return (
    <ul className="space-y-2 w-full max-w-md">
      {items.map(item => (
        <li key={item.id} className="py-2 px-4 rounded-lg bg-slate-400 hover:bg-slate-600 transition-all flex justify-between items-center">
          <span className="flex-grow text-lg">{item.name}</span>
          <div className="flex space-x-2">
            <button 
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded px-2 py-1"
            >
              Upravit
            </button>
            <button 
              className="bg-red-500 hover:bg-yellow-600 text-white rounded px-2 py-1"
            >
              Odstranit
            </button>
            <button
              onClick={() => handleClick(item.id)}
              disabled={item.isClicked}
              className={`rounded px-2 py-1 text-white ${
                item.isClicked
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {item.isClicked ? 'Byl jsi zapsán do předmětu' : 'Zapsat'}
            </button>
          </div>
        </li>
      ))}
      <div className="flex justify-center items-center">
        <button
          onClick={addNewSubject}
          className="bg-green-500 hover:bg-blue-600 text-white rounded px-2 py-1 w-48 max-w-full sm:mx-auto sm:w-48 transition-all"
        >
          Vytvořit nový předmět
        </button>
      </div>
    </ul>
  );
};

export default List;
