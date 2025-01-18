import React from 'react';
import { useQuiz } from '../context/QuizContext';
import Report from '../components/Report';

function ReportPage() {
  // Accessing the quiz context to get questions and answers
  const { questions, answers } = useQuiz();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Quiz Report</h1>
      {/* Rendering the Report component with quiz questions and answers */}
      <Report questions={questions} answers={answers} />
    </div>
  );
}

export default ReportPage;
