import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import EmailForm from '../components/EmailForm';

function StartPage() {
  // Initialize the navigation function and access the setUserEmail function from the Quiz context
  const navigate = useNavigate();
  const { setUserEmail } = useQuiz();

  // Handle form submission: set user email and navigate to the quiz page
  const handleSubmit = (email) => {
    setUserEmail(email);
    navigate('/quiz'); // Redirect to the quiz page
  };

  return (
    <div className="min-h-screen flex items-center justify-center -mt-16">  
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to the Quiz</h1>
        {/* Render the EmailForm component, passing handleSubmit as a prop */}
        <EmailForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default StartPage;
