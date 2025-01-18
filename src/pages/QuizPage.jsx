import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { fetchQuizQuestions } from '../utils/api';
import Quiz from '../components/Quiz';
import { Loader2 } from 'lucide-react';

function QuizPage() {
  const navigate = useNavigate();
  const { userEmail, setQuestions, questions } = useQuiz();

  // Redirect if no email is found in context
  useEffect(() => {
    if (!userEmail) {
      navigate('/', { replace: true }); // Navigate to home if email is not available
    }
  }, [userEmail, navigate]);

  // Fetch quiz questions using React Query
  const { isLoading, error, data: fetchedQuestions } = useQuery({
    queryKey: ['questions'], // Unique key for the query
    queryFn: fetchQuizQuestions, // Function to fetch quiz questions from API
    staleTime: Infinity, // Prevent automatic refetching
    cacheTime: 30 * 60 * 1000, // Cache questions for 30 minutes
    retry: 1, // Retry once on failure
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  // Update context when questions are fetched
  useEffect(() => {
    if (fetchedQuestions && fetchedQuestions.length > 0) {
      console.log('Setting questions in context:', fetchedQuestions);
      setQuestions(fetchedQuestions); // Set questions in context
    }
  }, [fetchedQuestions, setQuestions]);

  // Loading state while fetching quiz questions
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading your quiz questions...</p>
        </div>
      </div>
    );
  }

  // Error state if quiz questions fail to load
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Quiz</h2>
          <p className="text-gray-600 mb-6">
            {error.message || 'Failed to load quiz questions. Please try again.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Prepare state if questions are still being fetched or are empty
  if (!fetchedQuestions || !questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Preparing quiz questions...</p>
        </div>
      </div>
    );
  }

  // Main content when questions are successfully loaded
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Quiz in Progress</h1>
          <p className="text-gray-600 text-center mt-2">
            Good luck, {userEmail}!
          </p>
        </div>
        <Quiz /> {/* Render the Quiz component */}
      </div>
    </div>
  );
}

export default QuizPage;
