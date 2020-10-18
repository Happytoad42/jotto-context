import stringsModule from './strings';
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: 'submit'},
  emoji: { submit: '🚀'},
  mermish: {}
}

describe('language strings tests', () => {
  let originalWarn;
  const mockWarn = jest.fn();
  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  })

  afterEach(() => {
    console.warn = originalWarn;
  })

  test('returns correct submit string for english', () => {
    const string = getStringByLanguage('en', 'submit', strings );
    expect(string).toBe('submit');
    expect(mockWarn).not.toHaveBeenCalled();
  })
  test('returns correct submit string for emoji', () => {
    const string = getStringByLanguage('emoji', 'submit', strings);
    expect(string).toBe('🚀');
    expect(mockWarn).not.toHaveBeenCalled();
  })
  
  test('returns english submit string if no language provided', () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith(`Could not get string [submit] from language [notALanguage]`);
  })
  
  test('returns english submit string if no submit string exists for language', () => {
    const string = getStringByLanguage('mermish', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith(`Could not get string [submit] from language [mermish]`);
  })
})



