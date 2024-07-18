import React, { useState } from 'react';

function Choices({ choices, onChoiceSelect }) {
  const [selectedChoice, setSelectedChoice] = useState('');

  const handleChange = (event) => {
    setSelectedChoice(event.target.value);
    onChoiceSelect(event.target.value);
  };

  if (!choices) {
    return <p>Loading choices...</p>; // Render a loading message or an empty state
  }

  return (
    <div>
      <form>
        <p>Please select your answer:</p>
        {choices.map((choice, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`choice${index}`}
              name="choices"
              value={choice}
              onChange={handleChange}
            />
            <label htmlFor={`choice${index}`}>{choice}</label><br />
          </div>
        ))}
      </form>
    </div>
  );
}

export default Choices;
