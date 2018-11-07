
const TitlePageRoute = require('../../local_modules/routes/TitlePageRoute');

describe('TitlePageRoute for initial query', () => {
  const search = 'http://localhost:5000/title2';
  const query = {};
  const mockRequest = {
    query: query,
    search:search
  };

  test('showHelp should be true for empty', () => {
    const showHelp = TitlePageRoute._getExpressHelpParam(mockRequest);
    expect(showHelp).toBe(true);
  });

  test('timer is not set for empty', () => {
    const alarm = TitlePageRoute._getExpressAlarmParam(mockRequest);
    expect(alarm).not.toBeNull();
    expect(alarm.runTimer).toBe(false);
  });
});

describe('TitlePageRoute for initial query', () => {
  const query = {
    title: 'cuca'
  };
  const search = `http://localhost:5000/title2?title=${query.title}`;
  const mockRequest = {
    query: query,
    search:search
  };

  test('if title is the only thing sent, it should be found', () => {
    const title = TitlePageRoute._getExpressTitleParam(mockRequest);
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
  const mockRequest = {
    query: query,
    search:search
  };

  test('if title should be found if sent', () => {
    const title = TitlePageRoute._getExpressTitleParam(mockRequest);
    expect(title).toBe(query.title);
  });

  test('help should be found if sent', () => {
    debugger;
    const showHelp = TitlePageRoute._getExpressHelpParam(mockRequest);
    expect(showHelp).toBe(query.help);
  });

  test('timer should be found if sent', () => {
    debugger;
    const alarm = TitlePageRoute._getExpressAlarmParam(mockRequest);
    expect(alarm).not.toBeNull();
    //-- hours must be militiary time for js
    expect(alarm.hour).toBe(15);
    //-- minutes are rounded to the nearest 15 later
    expect(alarm.minute).toBe(0);
    //-- runtimer should be true if sent
    expect(alarm.runTimer).toBe(true);
  });
});