import React from 'react';

function Submit({ onClick }) {
  return(
  <div className='fire'>
  <button className='submit' onClick={onClick}>FIRE</button>
  </div>);
}

export default Submit;
