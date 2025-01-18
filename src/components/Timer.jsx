import React from 'react';
import { useTimer } from '../hooks/useTimer'; // Import the custom hook for the timer

// This component displays a timer that shows the remaining time in the quiz.
function Timer() {
  const { minutes, seconds } = useTimer(); // Get the minutes and seconds from the custom timer hook

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4">
      {/* Display the formatted time in the format MM:SS */}
      <div className="text-2xl font-mono">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
}

export default Timer;
