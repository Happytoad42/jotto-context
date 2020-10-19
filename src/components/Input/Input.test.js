import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../test/testUtils';
import Input from './Input';
import languageContext from '../../contexts/languageContext';

const defaultProps = { secretWord: 'party' };

/**
 * Creat ReactWrapper for Input component for testing
 * @param {object} testValues Context and props values for this test
 * @returns {ReactWrapper} Wrapper for Input component and providers
 */
const setup = ({ language, secretWord }) => {
  language = language || 'en';
  secretWord = secretWord || 'party';
  return mount(
    <languageContext.Provider value={language}>
      <Input secretWord={secretWord} />
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
