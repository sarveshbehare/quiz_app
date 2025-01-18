import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

// Provides navigation functionality for the quiz.
function Navigation() {
  const navigate = useNavigate();
  const { questions, answers } = useQuiz(); 

  // Navigates to the report page upon quiz submission
  const handleSubmit = () => {
    navigate('/report');
  };

  return (
    <div className="flex justify-between items-center">
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
