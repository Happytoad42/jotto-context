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
