import React from 'react';

export default function Guide(){
    return (
        <div className="documentation">
            <h1>Welcome to the Guide Page</h1>
            <p>This is a simple guide page for your app.</p>
        
            <h2>POWERUPS :</h2>
            <h3>Gravity Bomb '💣': extra time </h3>
            <h3>Asteroid Strike '🌠': incorrect choice removed</h3>
            <h3>Caddie the hacker '🤖': skip question </h3>
            <h3>Documentation '❓': check documentation</h3>

            <h2>HOW TO USE :</h2>
            <ol>
                <li>Choose the right answer to each question</li>
                <li>Select powerups if required</li>
                <li>Click on fire</li>
                <li>Complete before time..</li>
            </ol>
        </div>
    )
}
