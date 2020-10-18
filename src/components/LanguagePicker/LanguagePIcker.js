import React from 'react';
import propTypes from 'prop-types'

export const LanguagePicker = ({setLanguage}) => {
  const languages = [
    { code: 'en', symbol: '🇺🇸' },
    { code: 'emoji', symbol: '😊' },
  ];

const languageIcons = languages.map(lang => (
    <span 
      data-test='language-icon' 
      onClick={() => setLanguage(lang.code)} 
      key={lang.code}
    >
        {lang.symbol}
    </span>
    )
  )

  return (
    <div data-test="language-picker">
      {languageIcons}
    </div>
  )
}

LanguagePicker.propTypes = {
  setLanguage: propTypes.func.isRequired
}

export default LanguagePicker;
