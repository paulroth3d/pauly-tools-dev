const TemplateEngine = require('./TemplateEngine');

test('TemplateEngine writes an EJS File', () => {
  const pageName = 'testPage';
  const ejsBody = TemplateEngine._generateEJS(pageName);
  expect(ejsBody).not.toBe(null);
  expect(ejsBody).toContain(pageName);
});

test('TemplateEngine writes an app script', () => {
  const appName = 'testApp';
  const appBody = TemplateEngine._generateJSApp(appName);
  expect(appBody).not.toBe(null);
});

test('TemplateEngine knows the path for ejs files', () => {
  const pageName = 'testPage';
  const ejsPath = TemplateEngine._determineEJSPath(pageName);
  const expectedStr = '/src/serverSrc/pages/testPage.ejs';
  expect(ejsPath).toContain(expectedStr);
});

test('TemplateEngine knows the path for script files', () => {
  const pageName = 'testApp';
  const ejsPath = TemplateEngine._determineJSAppPath(pageName);
  const expectedStr = `/src/siteSrc/script/app/${pageName}.js`;
  expect(ejsPath).toContain(expectedStr);
});