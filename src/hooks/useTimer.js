import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

export function useTimer() {
  const { timeRemaining, setTimeRemaining } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/report');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setTimeRemaining, navigate]);

  return {
    minutes: Math.floor(timeRemaining / 60),
    seconds: timeRemaining % 60,
  };
}
