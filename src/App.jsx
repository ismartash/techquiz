import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { quizzes } from './data.js';

    function App() {
      const [selectedQuiz, setSelectedQuiz] = useState('');
      const [currentQuestion, setCurrentQuestion] = useState(0);
      const [score, setScore] = useState(0);
      const [quizStarted, setQuizStarted] = useState(false);
      const [selectedOption, setSelectedOption] = useState(null);
      const [quizCompleted, setQuizCompleted] = useState(false);

      const handleQuizChange = (event) => {
        setSelectedQuiz(event.target.value);
        setCurrentQuestion(0);
        setScore(0);
        setQuizStarted(false);
        setSelectedOption(null);
        setQuizCompleted(false);
      };

      const startQuiz = () => {
        if (selectedQuiz) {
          setQuizStarted(true);
        }
      };

      const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };

      const handleNextQuestion = () => {
        if (selectedOption === quizzes[selectedQuiz].questions[currentQuestion].correctAnswer) {
          setScore(score + 1);
        }
        setSelectedOption(null);
        if (currentQuestion < quizzes[selectedQuiz].questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setQuizCompleted(true);
        }
      };

      const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizStarted(false);
        setSelectedOption(null);
        setQuizCompleted(false);
      };

      const quizSelectionVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };

      const quizStartVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
      };

      const questionVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
      };

      const scoreVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
      };

      if (!selectedQuiz) {
        return (
          <motion.div
            className="app"
            variants={quizSelectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h1>Quiz App</h1>
            <div className="quiz-selector">
              <select onChange={handleQuizChange} value={selectedQuiz}>
                <option value="">Select a Quiz</option>
                {Object.keys(quizzes).map((quizName) => (
                  <option key={quizName} value={quizName}>
                    {quizName}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        );
      }

      if (!quizStarted) {
        return (
          <motion.div
            className="app"
            variants={quizStartVariants}
            initial="hidden"
            animate="visible"
          >
            <h1>{selectedQuiz}</h1>
            <button onClick={startQuiz}>start now</button>
          </motion.div>
        );
      }

      if (quizCompleted) {
        return (
          <motion.div
            className="app"
            variants={scoreVariants}
            initial="hidden"
            animate="visible"
          >
            <h1>Quiz Completed!</h1>
            <p className="score">
              Your Score: {score} / {quizzes[selectedQuiz].questions.length}
            </p>
            <button onClick={resetQuiz}>Take Again</button>
          </motion.div>
        );
      }

      const currentQuiz = quizzes[selectedQuiz];
      const question = currentQuiz.questions[currentQuestion];

      return (
        <motion.div
          className="app"
          variants={questionVariants}
          initial="hidden"
          animate="visible"
        >
          <h1>{selectedQuiz} Quiz</h1>
          <div className="question">
            <h2>{question.text}</h2>
            <ul className="options">
              {question.options.map((option, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleOptionChange}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={handleNextQuestion}>
            {currentQuestion === currentQuiz.questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </motion.div>
      );
    }

    export default App;
