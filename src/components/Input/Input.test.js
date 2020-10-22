import React from 'react';
import { shallow, mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../test/testUtils';

import languageContext from '../../contexts/languageContext';
import successContext from '../../contexts/successContext';

import Input from './Input';

const defaultProps = { secretWord: 'party' };

/**
 * Creat ReactWrapper for Input component for testing
 * @param {object} testValues Context and props values for this test
 * @returns {ReactWrapper} Wrapper for Input component and providers
 */
const setup = ({ language, secretWord, success }) => {
  language = language || 'en';
  secretWord = secretWord || 'party';
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Input secretWord={secretWord} />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

describe('Input languagePicker context tests', () => {
  test('Correctly renders submit in elnglish', () => {
    const wrapper = setup({ language: 'en' });
    expect(wrapper.text()).toBe('Submit');
  });
  test('Correctly renders submit in emoji if emoji language selected', () => {
    const wrapper = setup({ language: 'emoji' });
    expect(wrapper.text()).toBe('🚀');
  });
});

describe('Input component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({});
  });
  test('Renders component without crashing', () => {
    const component = findByTestAttr(wrapper, 'component-input');
    expect(component.length).toBe(1);
  });

  test('does not throw warning with expected props', () => {
    checkProps(Input, defaultProps);
  });
});

describe('state controlled Input field', () => {
  let wrapper;
  let mockSetCurrentGuess = jest.fn();
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = setup({});
  });
  test('state updates wth value on input change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  test('input clears on submit click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    submitButton.simulate('click', { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});

test('input component is empty when success is true', () => {
  const wrapper = setup({ secretWord: 'party', success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});
