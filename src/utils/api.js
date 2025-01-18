// Fetch quiz questions from an external API (Open Trivia Database)
export async function fetchQuizQuestions() {
  try {
    // Make the API call to fetch quiz questions
    const response = await fetch('https://opentdb.com/api.php?amount=15');
    const data = await response.json();

    // Check if the response is successful (response_code === 0 indicates success)
    if (data.response_code !== 0) {
      throw new Error('Failed to fetch questions');
    }

    // Transform the API data into the required format
    return data.results.map(question => ({
      question: question.question, // The question text
      correctAnswer: question.correct_answer, // The correct answer
      choices: shuffleArray([ // Shuffle the answers to randomize their order
        question.correct_answer,
        ...question.incorrect_answers
      ])
    }));
  } catch (error) {
    // Handle errors and log them to the console
    console.error('Error fetching questions:', error);
    throw new Error('Failed to load quiz questions. Please try again.');
  }
}

// Utility function to shuffle an array using the Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index between 0 and i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array; // Return the shuffled array
}
