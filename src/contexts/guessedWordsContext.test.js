import React from 'react';
import { shallow, mount } from 'enzyme';

import guessedWordsContext from './guessedWordsContext';

// Artificial component to test guessedWordsProvider
const FunctionalComponent = () => {
  guessedWordsContext.useGuessedWords();
  return <div />;
};

describe('guessedWordsContext', () => {
  test('guessedWordsContext does throw error when called outside GessedWordsProvider', () => {
    expect(() => {
      shallow(<FunctionalComponent />);
    }).toThrow('useGuessedWords must be used within GuessedWordsProvider');
  });

  test('guessedWordsContext does not throws error when called inside GuessedWordsProvider', () => {
    expect(() => {
      mount(
        <guessedWordsContext.GuessedWordsProvider>
          <FunctionalComponent />
        </guessedWordsContext.GuessedWordsProvider>
      );
    }).not.toThrow();
  });
});
