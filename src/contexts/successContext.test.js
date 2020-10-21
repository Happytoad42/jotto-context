import React from 'react';
import { shallow, mount } from 'enzyme';

import successContext from './successContext';

// a functional component that call useSuccess for test purpose
const FunctionalComponent = () => {
  successContext.useSuccess();
  return <div></div>;
};

test('useSuccess throws error when not wrapper in SuccessProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useSuccess must be used within SuccessProvider');
});

test('useSuccess does not throw error while wrapper in SuccessProvider', () => {
  expect(() => {
    mount(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    );
  }).not.toThrow();
});
