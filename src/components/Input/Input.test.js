import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../test/testUtils';
import Input from './Input';

const defaultProps = { secretWord: 'party' };

const setup = (secretWord = 'party') => {
  return shallow(<Input secretWord={secretWord} />);
};

describe('Input component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
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
  test('state updates wth value on input change', () => {
    const mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);

    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
});
