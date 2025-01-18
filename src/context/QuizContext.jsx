import React, { createContext, useContext, useState, useCallback } from 'react';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);

  // Function to reset the quiz state
  const resetQuiz = useCallback(() => {
    setUserEmail('');
    setQuestions([]);
    setAnswers({});
    setVisitedQuestions(new Set());
    setTimeRemaining(30 * 60);
  }, []);

  // Function to update quiz questions
  const updateQuestions = useCallback((newQuestions) => {
    if (Array.isArray(newQuestions) && newQuestions.length > 0) {
      setQuestions([...newQuestions]);
    }
  }, []);

  const value = {
    userEmail,
    setUserEmail,
    questions,
    setQuestions: updateQuestions,
    answers,
    setAnswers,
    visitedQuestions,
    setVisitedQuestions,
    timeRemaining,
    setTimeRemaining,
    resetQuiz
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
