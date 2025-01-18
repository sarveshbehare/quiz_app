import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import Timer from './Timer';
import QuestionOverview from './QuestionOverview';
import { X } from 'lucide-react';

// This component manages the main quiz flow, including displaying questions, navigation, and user interactions.
function Quiz() {
  const navigate = useNavigate();
  const { 
    questions, 
    answers, 
    setAnswers, 
    visitedQuestions, 
    setVisitedQuestions,
    timeRemaining 
  } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Redirect to the report page when the timer runs out.
  useEffect(() => {
    if (timeRemaining === 0) {
      navigate('/report');
    }
  }, [timeRemaining, navigate]);

  // Handle selecting an answer for the current question.
  const handleAnswerSelect = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
    setVisitedQuestions(prev => new Set([...prev, currentQuestionIndex]));
  };

  // Clear the selected answer for the current question.
  const handleClearSelection = () => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestionIndex];
      return newAnswers;
    });
  };

  // Navigate to a specific question by index.
  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
      setVisitedQuestions(prev => new Set([...prev, index]));
    }
  };

  // Render nothing if no questions are available.
  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-6xl mx-auto">
      <Timer /> {/* Display the quiz timer */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {/* Display the current question and allow clearing the selected answer */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
              {answers[currentQuestionIndex] && (
                <button
                  onClick={handleClearSelection}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <X size={16} />
                  Clear Selection
                </button>
              )}
            </div>

            {/* Display the current question and its choices */}
            <div className="mb-6">
              <p className="text-lg" dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
            </div>
            <div className="space-y-4">
              {currentQuestion.choices.map((choice, index) => (
                <button
                  key={index}
                  className={`w-full p-4 text-left rounded-lg border transition-colors duration-200 ${
                    answers[currentQuestionIndex] === choice
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'hover:bg-gray-50 border-gray-300'
                  }`}
                  onClick={() => handleAnswerSelect(choice)}
                  dangerouslySetInnerHTML={{ __html: choice }}
                />
              ))}
            </div>
          </div>

          {/* Navigation buttons for moving between questions */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => goToQuestion(currentQuestionIndex - 1)}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentQuestionIndex === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={() => navigate('/report')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => goToQuestion(currentQuestionIndex + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Sidebar with question overview */}
        <div className="md:col-span-1">
          <div className="sticky top-4">
            <QuestionOverview 
              currentQuestion={currentQuestionIndex}
              onQuestionSelect={goToQuestion}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
