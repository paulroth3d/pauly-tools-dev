/** test a very simple js app */

import ShoppingList2 from '../../../script/components/reactCourse/ShoppingList2';

test('we dont live in 1984', () => {
  expect(2+2).toBe(4);
});

test('ShoppingList2 should include item1', () => {
  const results = ShoppingList2({});
  expect(results).not.toBeNull();
});

test('ShoppingList2 is JSON', () => {
  const results = ShoppingList2({}).toJSON();
  expect(results).toContain('Item1');
});