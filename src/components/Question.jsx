import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';

// This component displays the current quiz question and allows the user to select an answer.
function Question() {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Tracks the index of the current question
  const { questions, answers, setAnswers, visitedQuestions, setVisitedQuestions } = useQuiz(); // Access quiz data and functions from context

  // Handles the user's answer selection and updates the context
  const handleAnswer = (choice) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: choice })); // Saves the selected answer
    setVisitedQuestions((prev) => new Set([...prev, currentQuestion])); // Marks the question as visited
  };

  // If the current question does not exist, return null
  if (!questions[currentQuestion]) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-xl font-semibold mb-4">
        Question {currentQuestion + 1} of {questions.length}
      </h2>
      {/* Display the question text, allowing HTML formatting */}
      <p className="mb-6" dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
      <div className="space-y-4">
        {/* Render answer choices as buttons */}
        {questions[currentQuestion].choices.map((choice, index) => (
          <button
            key={index}
            className={`w-full p-4 text-left rounded-lg border ${
              answers[currentQuestion] === choice
                ? 'bg-blue-100 border-blue-500' // Highlight selected answer
                : 'hover:bg-gray-50 border-gray-300' // Styling for non-selected answers
            }`}
            onClick={() => handleAnswer(choice)} // Handle answer selection
            dangerouslySetInnerHTML={{ __html: choice }} // Display choice text, allowing HTML formatting
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
