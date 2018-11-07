/** Test the title util */

import TitleUtil from '../common/TitleUtil';

// const TitleUtil = require('../common/TitleUtil').default;

test('Check Title sizes for Hello', () => {
  const myTitle = 'Hello';
  const expectedValue = 300;
  expect(TitleUtil.resizeTitle(myTitle)).toBe(expectedValue, `Resize title with "${myTitle} should be ${expectedValue} - per the old code`);
});

function compareFloats(float1, float2, epsilon){
  if (!epsilon) {
    epsilon = 0.00001;
  }

  return(
    (float1 - epsilon < float2) &&
    (float1 + epsilon > float2)
  );
}

test('Check color block sizes for Hello', () => {
  const myTitle = 'Hello';
  const expectedValue = 0.21;
  //-- per the old code
  expect(TitleUtil.resizeColorBlock(myTitle)).toBeCloseTo(expectedValue, 0.001);
});
