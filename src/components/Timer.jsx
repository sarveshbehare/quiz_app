import React from 'react';
import { useTimer } from '../hooks/useTimer'; 

function Timer() {
  const { minutes, seconds } = useTimer(); 

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4">
      <div className="text-2xl font-mono">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
}

export default Timer;
