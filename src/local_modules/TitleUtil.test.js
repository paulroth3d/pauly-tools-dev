/** Test the title util */

const TitleUtil = require('./TitleUtil');

// const TitleUtil = require('../common/TitleUtil').default;

test('Check Title sizes for Hello', () => {
  const myTitle = 'Hello';
  const expectedValue = 300;
  expect(TitleUtil.resizeTitle(myTitle)).toBe(expectedValue, `Resize title with "${myTitle} should be ${expectedValue} - per the old code`);
});

test('Check color block sizes for Hello', () => {
  const myTitle = 'Hello';
  const expectedValue = 0.21;
  //-- per the old code
  expect(TitleUtil.resizeColorBlock(myTitle)).toBeCloseTo(expectedValue, 0.001);
});

describe('TitlePageRoute for initial query', () => {
  const search = 'http://localhost:5000/title2';
  const query = {};

  test('showHelp should be true for empty', () => {
    const showHelp = TitleUtil.getExpressHelpParam(query);
    expect(showHelp).toBe(true);
  });

  test('timer is not set for empty', () => {
    const alarm = TitleUtil.getExpressAlarmParam(query);
    expect(alarm).not.toBeNull();
    expect(alarm.runTimer).toBe(false);
  });
});

describe('TitlePageRoute for query with title', () => {
  const query = {
    title: 'cuca'
  };
  const search = `http://localhost:5000/title2?title=${query.title}`;

  test('if title is the only thing sent, it should be found', () => {
    const title = TitleUtil.getExpressTitleParam(query);
    expect(title).toBe(query.title);
  });
});

describe('Complex request with alarm', () => {
  const query = {
    title:'cuca',
    help: false,
    alarm: '2:50 pm'
  };
  const search = `http://localhost:5000/title2?title=${query.title}` +
    `&help=${query.help}` +
    `&alarm=${query.alarm}`;

  test('if title should be found if sent', () => {
    const title = TitleUtil.getExpressTitleParam(query);
    expect(title).toBe(query.title);
  });

  test('help should be found if sent', () => {
    const showHelp = TitleUtil.getExpressHelpParam(query);
    expect(showHelp).toBe(query.help);
  });

  test('timer should be found if sent', () => {
    const alarm = TitleUtil.getExpressAlarmParam(query);
    expect(alarm).not.toBeNull();
    //-- hours must be militiary time for js
    expect(alarm.hour).toBe(15);
    //-- minutes are rounded to the nearest 15 later
    expect(alarm.minute).toBe(0);
    //-- runtimer should be true if sent
    expect(alarm.runTimer).toBe(true);
  });
});
