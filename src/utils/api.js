// Fetch quiz questions from an external API (Open Trivia Database)
export async function fetchQuizQuestions() {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=15');
    const data = await response.json();

    if (data.response_code !== 0) {
      throw new Error('Failed to fetch questions');
    }

    return data.results.map(question => ({
      question: question.question,
      correctAnswer: question.correct_answer,
      choices: shuffleArray([
        question.correct_answer,
        ...question.incorrect_answers
      ])
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to load quiz questions. Please try again.');
  }
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
