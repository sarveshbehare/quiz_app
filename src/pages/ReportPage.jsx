import React from 'react';
import { useQuiz } from '../context/QuizContext';
import Report from '../components/Report';

function ReportPage() {
  const { questions, answers } = useQuiz();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Quiz Report</h1>
      <Report questions={questions} answers={answers} />
    </div>
  );
}

export default ReportPage;
