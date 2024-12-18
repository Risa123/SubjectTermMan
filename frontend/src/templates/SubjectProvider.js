import { createContext, useState, useEffect } from 'react';
import { post } from "../requestCommon";

export const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const fetchSubjects = async () => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      console.error('No auth token found');
      return;
    }
    try {
      const response = await post('subject/list', {
        authToken: storedToken
      });
      if (response.ok) {
        const data = await response.json();
        const transformedData = data.map(subject => ({
          _id: subject._id,
          name: subject.name,
          credits: subject.credits,
          info: subject.info,
          isClicked: false
        }));
        setSubjects(transformedData || []);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSignIn = (id) => {
    setSubjects(subjects.map(subject =>
      subject._id === id ? { ...subject, isClicked: true } : subject
    ));
  };

  const addNewSubject = async (data) => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      console.error('No auth token found');
      return;
    }

    try {
      const requestBody = {
        authToken: storedToken,
        name: String(data.inputValue).trim(),
        credits: Number(data.secondInputValue),
        info: String(data.thirdInputValue).trim()
      };

      const response = await post('subject/create', requestBody);
      
      if (response.ok) {
        await fetchSubjects();
        setCreateModalOpen(false);
      } else {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error details:', error);
    }
  };

  const deleteSubject = async (id) => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      console.error('No auth token found');
      return;
    }

    try {
      const response = await post('subject/remove', {
        authToken: storedToken,
        subjectID: id
      });

      if (response.ok) {
        await fetchSubjects();
      } else {
        console.error('Error deleting subject');
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const editSubject = async (id, data) => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      console.error('No auth token found');
      return;
    }

    try {
      const response = await post('subject/update', {
        authToken: storedToken,
        subjectID: id,
        name: data.inputValue,
        credits: parseInt(data.secondInputValue),
        info: data.thirdInputValue
      });

      if (response.ok) {
        await fetchSubjects();
      } else {
        const errorText = await response.text();
        console.error('Error updating subject:', errorText);
      }
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const getSubjects = () => {
    return subjects.map(subject => ({
      id: subject._id,
      name: subject.name,
      credits: subject.credits,
      info: subject.info,
      isClicked: subject.isClicked
    }));
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        isCreateModalOpen,
        setCreateModalOpen,
        handleSignIn,
        addNewSubject,
        deleteSubject,
        editSubject,
        getSubjects
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};