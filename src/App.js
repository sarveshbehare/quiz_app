import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuizProvider } from './context/QuizContext';
import StartPage from './pages/StartPage';
import QuizPage from './pages/QuizPage';
import ReportPage from './pages/ReportPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/report" element={<ReportPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </QuizProvider>
    </QueryClientProvider>
  );
}

export default App;