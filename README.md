# Quiz Application

A dynamic quiz application that allows users to take a timed quiz with multiple-choice questions. The app features a 30-minute countdown timer, question navigation, progress tracking, and a detailed results page.

---

## Features

- **Countdown Timer:** A 30-minute timer to challenge users.
- **Question Navigation:** Easily move between questions.
- **Progress Tracking:** Visualize completed and remaining questions.
- **Results Page:** Detailed performance report after the quiz.
- **Responsive Design:** Optimized for all screen sizes using Tailwind CSS.

---

## Approach

- **Global State Management:** Used React Context for seamless state sharing.
- **Responsive Design:** Implemented with Tailwind CSS.
- **API Integration:** Fetched questions from the [Open Trivia Database API](https://opentdb.com/).
- **Modular Design:** Built reusable components for scalability.
- **Data Fetching & Caching:** Used React Query for efficient API requests.
- **Routing:** Implemented client-side routing with React Router.

---

## Tech Stack

- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** Context API
- **Data Fetching:** React Query
- **Icons:** Lucide React

---

## Components

### **Pages**
- `StartPage.jsx`: Landing page for the application.
- `QuizPage.jsx`: Main quiz interface.
- `ReportPage.jsx`: Quiz results display.

### **Core Components**
- `EmailForm`: Handles user email input.
- `Navigation`: Quiz navigation controls.
- `Question`: Displays individual quiz questions.
- `QuestionOverview`: Panel for tracking question progress.
- `Quiz`: Combines all quiz elements into one interface.
- `Report`: Generates a detailed quiz results page.
- `Timer`: Displays and manages the countdown timer.

### **Utilities**
- `QuizContext.jsx`: Manages global state using React Context.
- `useTimer.js`: Contains timer logic.
- `api.js`: Handles API integration with the Open Trivia Database.

---

## Setup Instructions
1. Download or clone the repository. 
2. Open the project folder.  
3. Install the necessary dependencies (npm install).  
4. Start the development server (npm start).  
