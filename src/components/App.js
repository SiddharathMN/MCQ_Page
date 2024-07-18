import React, { useState, useEffect } from 'react';
import Question from './Question';
import Choices from './Choices';
import Submit from './Submit';
import { mcq } from './Data.js';
import Guide from './Guidebook';
let index = 0;

function App() {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(mcq.length > 0 ? mcq[index].question : '');
  const [choices, setChoices] = useState(mcq.length > 0 ? mcq[index].choices : []);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [time, setTime] = useState(600);
  const [document, setDocument] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          endQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
  };

  const checkAnswer = () => {
    if (selectedChoice === mcq[index].correctAnswer) {
      setScore((prevScore) => prevScore + 1);  // Use functional form to update the score
    }
    handleChange();
  };

  const handleChange = () => {
    index += 1;
    if (index < mcq.length) {
      setQuestion(mcq[index].question);
      setChoices(mcq[index].choices);
      setSelectedChoice(''); // Reset selected choice
    } else {
      alert('All questions have been answered. Final score is ' + (selectedChoice === mcq[index - 1].correctAnswer ? score + 1 : score));
      resetQuiz();
    }
  };

  const endQuiz = () => {
    alert('Quiz has ended. Final score is ' + score);
    resetQuiz();
  };

  const resetQuiz = () => {
    index = 0;
    setScore(0);
    setQuestion(mcq.length > 0 ? mcq[index].question : '');
    setChoices(mcq.length > 0 ? mcq[index].choices : []);
    setSelectedChoice('');
    setTime(600); // Reset the timer
  };

  const handlePowerUp = () => {
    setTime((prevTime) => prevTime + 5); // Increase time by 5 seconds
  };

  const handleStrikeOut = () => {
    const correctAnswer = mcq[index].correctAnswer;
    const incorrectChoices = choices.filter(choice => choice !== correctAnswer);
    const remainingChoices = [correctAnswer, ...incorrectChoices.slice(0, 2)];
    setChoices(remainingChoices.sort(() => Math.random() - 0.5)); // Shuffle the remaining choices
  };

  const handleSkipQuestion = () => {
    setScore((prevScore) => prevScore + 1); // Increase score by 1
    handleChange();
  };

  function toggleDocumentation() {
    setDocument(!document);
  }

  return (
    <div className="mainContent">
      <div className="mainQuestion" wrap="left">
      <h3>{index+1}/{mcq.length}</h3>
      <p>Score: {score}</p>
      <p>Time Left: {time}</p>
      <button onClick={handlePowerUp} className="powerups">💣</button>
      <button onClick={handleStrikeOut} className="powerups">🌠</button>
      <button onClick={handleSkipQuestion} className="powerups">🤖</button>
      <button className="powerups" onClick={toggleDocumentation}>❓</button>
      <Question question={question} />
      <Choices choices={choices} onChoiceSelect={handleChoiceSelect} />
      <Submit onClick={checkAnswer} />
      </div>
      <div wrap="right">{document && <Guide />}</div>
    </div>
  );
}

export default App;



