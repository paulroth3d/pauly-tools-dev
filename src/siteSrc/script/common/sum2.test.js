const sum = require('./sum');

test('add 3+2 expects 5', () => {
  expect(sum(3,2)).toBe(5);
});

test('it is not 1984', () => {
  expect(sum(1,2)).not.toBe('love');
});