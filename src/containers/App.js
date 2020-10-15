import React from 'react';
import hookActions from '../actions/hookActions';
import Input from '../components/Input/Input';

/**
 * reducer to update state called automatically by dispatch
 * @param {object} state  - existing state
 * @param {object} action  container 'type' and 'payload' props for the state update
 * @returns {object} new state
 */
const reducer = (state, action) => {
  switch(action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null })

  const setSecretWord = (secretWord) => dispatch({ type: 'setSecretWord', payload: secretWord });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord)
  }, [])

  return (
    <div data-test='component-app'>
      <h1>Welcome to Jotto!</h1>
      <Input secretWord={'party'}/>
    </div>
  );
}

export default App;
