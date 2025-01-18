import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

// Displays quiz results including score, time taken, and detailed review of each question.
function Report() {
  const navigate = useNavigate();
  const { questions, answers, timeRemaining, resetQuiz } = useQuiz();

  // Calculates the score based on correct answers.
  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  // Calculates the time taken based on the remaining time.
  const timeTaken = 1800 - timeRemaining;
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  // Resets the quiz and navigates to the home page.
  const handleReturnHome = () => {
    resetQuiz();
    navigate('/');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Final Score</h3>
            <p className="text-3xl font-bold text-blue-600">
              {calculateScore()} / {questions.length}
            </p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Time Taken</h3>
            <p className="text-3xl font-bold text-green-600">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Question {index + 1}
            </h3>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Your Answer:</h4>
                <div
                  className={`p-3 rounded-lg ${
                    answers[index] === question.correctAnswer
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                  dangerouslySetInnerHTML={{ __html: answers[index] || 'Not answered' }}
                />
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Correct Answer:</h4>
                <div
                  className="p-3 rounded-lg bg-green-100 text-green-800"
                  dangerouslySetInnerHTML={{ __html: question.correctAnswer }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>     

      <div className="flex justify-center pt-8">
        <button
          onClick={handleReturnHome}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default Report;
