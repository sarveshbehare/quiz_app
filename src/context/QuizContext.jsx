import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the context to manage quiz-related states
const QuizContext = createContext();

// QuizProvider component to wrap the app and provide context values to children
export function QuizProvider({ children }) {
  const [userEmail, setUserEmail] = useState(''); // Store the user's email
  const [questions, setQuestions] = useState([]); // Store quiz questions
  const [answers, setAnswers] = useState({}); // Store answers to the questions
  const [visitedQuestions, setVisitedQuestions] = useState(new Set()); // Track visited questions
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // Store remaining time

  // Function to reset the quiz state
  const resetQuiz = useCallback(() => {
    setUserEmail('');
    setQuestions([]);
    setAnswers({});
    setVisitedQuestions(new Set());
    setTimeRemaining(30 * 60); // Reset time to 30 minutes
  }, []);

  // Function to update the quiz questions
  const updateQuestions = useCallback((newQuestions) => {
    if (Array.isArray(newQuestions) && newQuestions.length > 0) {
      setQuestions([...newQuestions]); // Set the new questions
    }
  }, []);

  // The context value that will be provided to all child components
  const value = {
    userEmail,
    setUserEmail,
    questions,
    setQuestions: updateQuestions, // Set custom update function for questions
    answers,
    setAnswers,
    visitedQuestions,
    setVisitedQuestions,
    timeRemaining,
    setTimeRemaining,
    resetQuiz // Function to reset the quiz
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

// Custom hook to use quiz context values and functions
export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider'); // Ensure the hook is used inside a provider
  }
  return context; // Return context values
}
