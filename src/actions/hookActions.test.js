import moxios from 'moxios';

import { getSecretWord } from './hookActions';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  test('getSecretWord calls setSecretWord callback on axios response', async () => {
    const secretWord = 'party';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });
    // create mock for callback arg
    const mockSetSecreetWord = jest.fn();
    await getSecretWord(mockSetSecreetWord);

    // see whether mock was run with the correct argument
    expect(mockSetSecreetWord).toHaveBeenCalledWith(secretWord);
  });
});
