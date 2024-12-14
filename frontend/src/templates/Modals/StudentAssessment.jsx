import React, { useState } from 'react';

const StudentAssessment = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Jan Novák', maxPoints: 100, earnedPoints: 0, confirmed: false },
    { id: 2, name: 'Petra Svobodová', maxPoints: 100, earnedPoints: 0, confirmed: false },
    { id: 3, name: 'Tomáš Dvořák', maxPoints: 100, earnedPoints: 0, confirmed: false },
  ]);

  const handleConfirm = (studentId) => {
    setStudents((prevStudents) => {
      const updatedStudents = prevStudents.map((student) =>
        student.id === studentId ? { ...student, confirmed: true } : student
      );
      const confirmedStudents = updatedStudents.filter((s) => s.confirmed);
      const unconfirmedStudents = updatedStudents.filter((s) => !s.confirmed);
      return [...unconfirmedStudents, ...confirmedStudents];
    });
  };

  const handlePointsChange = (studentId, field, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, [field]: Number(value) } : student
      )
    );
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
      <h1 className="text-xl font-bold mb-4">Tabulka studentů</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Student</th>
            <th className="border border-gray-300 p-2">Maximální body</th>
            <th className="border border-gray-300 p-2">Získané body</th>
            <th className="border border-gray-300 p-2">Výsledek (%)</th>
            <th className="border border-gray-300 p-2">Akce</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className={`${
                student.confirmed ? 'bg-gray-100' : 'bg-white'
              } transition-all`}
            >
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={student.maxPoints}
                  min="0"
                  onChange={(e) =>
                    handlePointsChange(student.id, 'maxPoints', e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="number"
                  value={student.earnedPoints}
                  min="0"
                  max={student.maxPoints}
                  onChange={(e) =>
                    handlePointsChange(student.id, 'earnedPoints', e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {student.maxPoints > 0
                  ? ((student.earnedPoints / student.maxPoints) * 100).toFixed(2)
                  : '0.00'}
                %
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {!student.confirmed && (
                  <button
                    onClick={() => handleConfirm(student.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Potvrdit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentAssessment;
