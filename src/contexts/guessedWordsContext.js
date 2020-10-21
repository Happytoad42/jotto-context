import React from 'react';

const successContext = React.createContext();

/**
 * @function useGuessedWords
 * @returns {array} successContext value, a state of [value, setter]
 */
function useGuessedWords() {
  const context = React.useContext(successContext);

  if (!context) {
    throw new Error('useGuessedWords must be used within GuessedWordsProvider');
  }

  return context;
}

/**
 * @function GuessedWordsProvider
 * @param {object} props props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
function GuessedWordsProvider(props) {
  const [guessedWords, setGuessedWords] = React.useState([]);

  const value = React.useMemo(() => [guessedWords, setGuessedWords], [
    guessedWords,
  ]);

  return <successContext.Provider value={value} {...props} />;
}

export default { useGuessedWords, GuessedWordsProvider };
