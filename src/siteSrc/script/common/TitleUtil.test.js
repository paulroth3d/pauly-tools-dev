/** Test the title util */

import TitleUtil from '../common/TitleUtil';

// const TitleUtil = require('../common/TitleUtil').default;



test('Check Title sizes for Hello', () => {
  const myTitle = 'Hello';
  const expectedValue = 300;
  expect(TitleUtil.resizeTitle(myTitle)).toBe(expectedValue, `Resize title with "${myTitle} should be ${expectedValue} - per the old code`);
});