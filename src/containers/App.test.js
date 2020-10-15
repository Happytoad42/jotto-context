import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../test/testUtils';
import App from './App';

import hookActions from '../actions/hookActions.js'

const mockGetSecretWord = jest.fn();

/**
 * Setup function for App component
 * @returns { ReactWrapper }
 */
const setup = () => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  // use mount because useEffect not called on Shallow
  // issue: https://github.com/enzymejs/enzyme/issues/2086
  return mount(<App />);
};

test('App renders without errors', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe('getSecretWord calls', () => {
  test('getSecretWord gets called on App mount', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  })
})
