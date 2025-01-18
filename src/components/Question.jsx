import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

// Displays the current quiz question and allows the user to select an answer.
function Question() {
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const { questions, answers, setAnswers, visitedQuestions, setVisitedQuestions } = useQuiz(); 

  // Updates the selected answer and marks the question as visited
  const handleAnswer = (choice) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: choice }));
    setVisitedQuestions((prev) => new Set([...prev, currentQuestion]));
  };

  // If the question doesn't exist, return null
  if (!questions[currentQuestion]) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-xl font-semibold mb-4">
        Question {currentQuestion + 1} of {questions.length}
      </h2>
      <p className="mb-6" dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
      <div className="space-y-4">
        {questions[currentQuestion].choices.map((choice, index) => (
          <button
            key={index}
            className={`w-full p-4 text-left rounded-lg border ${
              answers[currentQuestion] === choice
                ? 'bg-blue-100 border-blue-500'
                : 'hover:bg-gray-50 border-gray-300'
            }`}
            onClick={() => handleAnswer(choice)} 
            dangerouslySetInnerHTML={{ __html: choice }} 
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
