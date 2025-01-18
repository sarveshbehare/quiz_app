import React, { useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';

// Provides an overview of the quiz, showing the status of each question.
function QuestionOverview({ currentQuestion, onQuestionSelect }) {
  const { questions, answers, visitedQuestions } = useQuiz();

  // Calculates statistics for answered, visited, and not visited questions.
  const stats = useMemo(() => {
    const answered = Object.keys(answers).length;
    const visited = visitedQuestions.size;
    const notVisited = questions.length - visited;
    const onlyVisited = visited - answered;

    return {
      answered,
      onlyVisited,
      notVisited,
      total: questions.length,
    };
  }, [answers, visitedQuestions, questions]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Question Overview</h3>
      <div className="grid grid-cols-3 gap-2">
        {questions.map((_, index) => {
          const isVisited = visitedQuestions.has(index);
          const isAnswered = answers[index] !== undefined;
          const isCurrent = currentQuestion === index;

          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={`p-2 text-center rounded transition-colors duration-200 ${
                isCurrent
                  ? 'bg-blue-500 text-white'
                  : isAnswered
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : isVisited
                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

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
