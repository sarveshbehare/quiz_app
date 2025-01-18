import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

// Custom hook to manage the timer for the quiz
export function useTimer() {
  const { timeRemaining, setTimeRemaining } = useQuiz(); // Get timeRemaining and setter function from context
  const navigate = useNavigate(); // Navigation function to redirect to the report page

  useEffect(() => {
    // Set up an interval to decrease time every second
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        // When time reaches 0, stop the timer and navigate to the report page
        if (prev <= 1) {
          clearInterval(timer); // Clear the interval to stop the timer
          navigate('/report'); // Navigate to the report page
          return 0;
        }
        return prev - 1; // Decrease the time by 1 second
      });
    }, 1000);

    // Cleanup function to clear the timer when the component is unmounted
    return () => clearInterval(timer);
  }, [setTimeRemaining, navigate]);

  // Return the time in minutes and seconds
  return {
    minutes: Math.floor(timeRemaining / 60),
    seconds: timeRemaining % 60,
  };
}
