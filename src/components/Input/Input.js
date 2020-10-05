import React from 'react';
import propTypes from 'prop-types';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');

  // TODO update guessWord context on submit button click
  const handleSubmitClick = (e) => {
    e.preventDefault();
    setCurrentGuess('');
  };

  return (
    <div data-test='component-input'>
      <form className='form-inline'>
        <input
          type='text'
          placeholder='Try guessing a word'
          data-test='input-box'
          className='mb-2 mx-sm-3'
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button
          className='btn btn-primary mb-2'
          type='submit'
          data-test='submit-button'
          onClick={(e) => handleSubmitClick(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: propTypes.string.isRequired,
};

export default Input;
