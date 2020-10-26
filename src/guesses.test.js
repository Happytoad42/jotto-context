import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import Input from './components/Input/Input';
import GuessedWords from './components/GuessedWords/GuessedWords';

function setup(guessedWordsStrings = [], secretWord = 'party') {
  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );

  const submitButton = findByTestAttr(wrapper, 'submit-button');
  const inputBox = findByTestAttr(wrapper, 'input-box');

  // pre-populating guessed words here
  guessedWordsStrings.map((word) => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate('change', mockEvent);
    submitButton.simulate('click');
  });

  return [wrapper, inputBox, submitButton];
}

describe('test word guesses', () => {
  let wrapper;
  let inputBox;
  let submitButton;

  describe('non-empty guessWords', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup(['agile'], 'party');
    });
    describe('correct guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'party' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });
      test('Input component contains no children', () => {
        const inputComponent = findByTestAttr(wrapper, 'component-input');
        expect(inputComponent.children().length).toBe(0);
      });
      test('GuessedWords table row count reflects updated guess', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
    describe('incorrect guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });
      test('input bix remains', () => {
        expect(inputBox.exists()).toBe(true);
      });
      test('GuessedWords table row count reflects updated guess', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
  });

  describe('empty guessWords', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup([], 'party');
    });
    describe('correct guess', () => {
      test('GuessedWords table row count reflects updated guess', () => {
        const mockEvent = { target: { value: 'party' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(1);
      });
    });
    describe('incorrect guess', () => {
      test('guessedWords table row count did not increased', () => {
        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(1);
      });
    });
  });
});
