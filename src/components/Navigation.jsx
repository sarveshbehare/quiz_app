import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

// This component provides navigation functionality for the quiz, including a submit button to end the quiz.
function Navigation() {
  const navigate = useNavigate();
  const { questions, answers } = useQuiz(); // Accesses quiz data (questions and answers) from the context

  // Handles quiz submission by navigating to the report page
  const handleSubmit = () => {
    navigate('/report');
  };

  return (
    <div className="flex justify-between items-center">
      {/* Button to submit the quiz */}
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default Navigation;
