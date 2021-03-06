import React from 'react';
import hookActions from '../actions/hookActions';
import languageContext from '../contexts/languageContext';
import successContext from '../contexts/successContext';
import guessedWordsContext from '../contexts/guessedWordsContext';

import Congrats from '../components/Congrats/Congrats';
import GuessedWords from '../components/GuessedWords/GuessedWords';
import LanguagePicker from '../components/LanguagePicker/LanguagePicker';
import Input from '../components/Input/Input';

/**
 * reducer to update state called automatically by dispatch
 * @param {object} state  - existing state
 * @param {object} action  container 'type' and 'payload' props for the state update
 * @returns {object} new state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    case 'setLanguage':
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: 'en',
  });

  const setSecretWord = (secretWord) =>
    dispatch({ type: 'setSecretWord', payload: secretWord });

  const setLanguage = (language) =>
    dispatch({ type: 'setLanguage', payload: language });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className='container' data-test='spinner'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div className='container' data-test='component-app'>
      <h1>Jotto</h1>
      <h3>Hey! Secret word is...{state.secretWord}</h3>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
}

export default App;
