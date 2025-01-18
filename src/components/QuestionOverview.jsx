import React, { useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';

// This component provides an overview of the quiz, showing the status of each question (answered, visited, or not visited).
function QuestionOverview({ currentQuestion, onQuestionSelect }) {
  const { questions, answers, visitedQuestions } = useQuiz();

  // Calculate statistics for the overview: answered, only visited, not visited, and total questions.
  const stats = useMemo(() => {
    const answered = Object.keys(answers).length; // Count of questions that have been answered
    const visited = visitedQuestions.size; // Count of questions that have been visited
    const notVisited = questions.length - visited; // Count of questions not visited
    const onlyVisited = visited - answered; // Count of visited but unanswered questions

    return {
      answered,
      onlyVisited,
      notVisited,
      total: questions.length, // Total number of questions
    };
  }, [answers, visitedQuestions, questions]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Question Overview</h3>
      <div className="grid grid-cols-3 gap-2">
        {/* Render a button for each question, showing its status */}
        {questions.map((_, index) => {
          const isVisited = visitedQuestions.has(index); // Whether the question has been visited
          const isAnswered = answers[index] !== undefined; // Whether the question has been answered
          const isCurrent = currentQuestion === index; // Whether this question is currently selected

          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)} // Navigate to the selected question
              className={`p-2 text-center rounded transition-colors duration-200 ${
                isCurrent
                  ? 'bg-blue-500 text-white' // Highlight current question
                  : isAnswered
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' // Style for answered questions
                  : isVisited
                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' // Style for visited questions
                  : 'bg-gray-100 hover:bg-gray-200' // Style for not visited questions
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Legend for question statuses */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded bg-green-100"></div>
          <span>Answered</span>
          <span className="ml-auto">{stats.answered}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded bg-yellow-100"></div>
          <span>Only Visited</span>
          <span className="ml-auto">{stats.onlyVisited}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded bg-gray-100"></div>
          <span>Not Visited</span>
          <span className="ml-auto">{stats.notVisited}</span>
        </div>
        {/* Display total questions */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Total Questions</span>
            <span>{stats.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionOverview;
