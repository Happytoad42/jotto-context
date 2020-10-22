import React from 'react';
import propTypes from 'prop-types';

import languageContext from '../../contexts/languageContext';
import successContext from '../../contexts/successContext';
import stringsModule from '../../helpers/strings';

const Input = ({ secretWord }) => {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [currentGuess, setCurrentGuess] = React.useState('');

  // TODO update guessWord context on submit button click
  const handleSubmitClick = (e) => {
    e.preventDefault();
    setCurrentGuess('');
  };

  if (success) {
    return null;
  }

  return (
    <div data-test='component-input'>
      <form className='form-inline'>
        <input
          type='text'
          placeholder={stringsModule.getStringByLanguage(
            language,
            'guessInputPlaceholder'
          )}
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
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: propTypes.string.isRequired,
};

export default Input;
