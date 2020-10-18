import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../../../test/testUtils';
import LanguagePicker from './LanguagePIcker'

const mockSetLanguage = jest.fn();

const setup = () => {
  return shallow(<LanguagePicker  setLanguage={mockSetLanguage}/>)
}

describe('LanguagePicker testing', () => {
  test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'language-picker');
    expect(component.exists()).toBe(true);
  })
  
  test('does not throw warning with expected props', () => {
    checkProps(LanguagePicker, { setLanguage: jest.fn()})
  })
  
  test('renders non-zero language icons', () => {
    const wrapper = setup();
    const languageIcons = findByTestAttr(wrapper, 'language-icon');
    expect(languageIcons.length).toBeGreaterThan(0)
  });
  
  test('calls setLanguage props upon click', () => {
    const wrapper = setup();
    const languageIcons = findByTestAttr(wrapper, 'language-icon');
    languageIcons.first().simulate('click');
    expect(mockSetLanguage).toHaveBeenCalled();
  })

})
