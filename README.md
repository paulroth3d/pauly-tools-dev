# node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

# Why

* Using the traditional webpack / react setups, it really doesn't allow for web request processing (POST variables, request info) at least that I've seen.

* The ways that have require a proxy where we expose out the API request side and this seems to break down with more complex examples and locks me in to a url pattern to funnel to the other server - requiring a different setup if I don't want to use the proxy.

* I want something that can handle both simple (no server processing) or complex (use server processing), without the need to switch setups.

* of course, I also want live reloading, unit tests with coverage, shared code between the server, linting, sass/scss and all the other modern web trappings.

## Commands

The commands for running are broken into these following groups:

(For a list of all commands, run: `npm run`)

Note that gulp is used as the task manager, with more descriptions of the tasks and what they do. Please see the [gulp](gulp) section below for more detail)

### heroku / node standard commands

<table>
	<tr><th>Command</th><th>Description</th></tr>
	<tr><td>start</td><td>Starts the server</td></tr>
	<tr><td>postinstall</td><td>Ran after installing all modules <br /> likely when deployed</td></tr>
	<tr><td>pre-deploy-check</td><td>After mocking environment variables, run all lint and unit tests as though it was going to production.<br />
		Use this as a final step before deploying to heroku
	</td></tr>
	<tr><td>compile</td><td>Compiles using webpack into the server/public directory.</td></tr>
	<tr><td>debug</td><td>Runs the server with inspect-brk (to support debugging)</td></tr>
	<tr><td>watch</td><td>watches / lints / compiles both server and site code.<br />
		If only site code is updated, then it will still liveReload as expected.<br />
		Same for pure server code and even an intermix between the two.
	</td></tr>
	<tr><td>test</td><td>Lint and run jest against the code.</td></tr>
	<tr><td>doc</td><td>Runs Styleguidist (styleguide) to the output folder</td></tr>
</table>

### Development

<table>
	<tr><th>Command</th><th>Description</th></tr>
	<tr><td>compile</td><td>Compiles using webpack into the server/public directory.</td></tr>
	<tr><td>debug</td><td>Runs the server with inspect-brk (to support debugging)</td></tr>
	<tr><td>watch</td><td>watches / lints / compiles both server and site code.<br />
		If only site code is updated, then it will still liveReload as expected.<br />
		Same for pure server code and even an intermix between the two.
	</td></tr>
	<tr><td>compile-watch</td><td>Alias of watch</td></tr>
	<tr><td>internal-watch</td><td>Watch any internal (non site/server code - like gulp / etc)
	</td></tr>
	<tr><td>doc</td><td>Runs Styleguidist (styleguide) to the output folder</td></tr>
	<tr><td>doc-watch</td><td>Watches the doc to generate while working on them.</td></tr>
	<tr><td>test</td><td>Lint and run jest against the code.</td></tr>
	<tr><td>test-watch</td><td>Watch server and site code for linting / running only the tests changed per git</td></tr>
	<tr><td>test-watch-all</td><td>Watch server and site code for linting / running all tests tests</td></tr>
	<tr><td>test-debug</td><td>Runs the test scripts with inspect-brk <br />(note that breakpoints won't work in jest prior to Node 8+</td></tr>
</table>

### View Configs

<table>
	<tr><th>Command</th><th>Description</th></tr>
	<tr><td>view-file-paths</td><td>View the current file configurations <br />
		To avoid files from getting referenced all over the place <br />
		the files are specified in config/FilePaths. <br />
		So it can be set once and leveraged anywhere.<br />
		<b>This lets you see the configuration</b></td></tr>
	<tr><td>view-webpack-config</td><td>Shows the current webpack configuration. <br />
		We try to use the write once - use anywhere philosophy <br />
		So the babel configuration is configured in babel.config.js <br />
		but those same values are used whether using tests / execution or linting. <br />
		<b>This lets you see the current configuration</td></tr>
	<tr><td>view-nodemon-config</td><td>See the current nodemon configuration. <br />
		Since this project supports both static server and dynamic servers, <br />
		This is only used when the server side changes. <br />
		Changes to site code still is automatically updated using webpack.</td></tr>
	<tr><td>view-livereload-config</td><td>See the livereload configuration<br />
		Currently there isn't much, but this is used to allow programmatic browser reloading. (Either from nodemon, but can be expanded to anything.)</td></tr>
	<tr><td>view-styleguide-config</td><td>See the current styleguidist (styleguide) config</td></tr>
	<tr><td>view-jest-config</td><td>See the current jest unit testing framework config.</td></tr>
</table>



### Lint

<table>
	<tr><th>Command</th><th>Description</th></tr>
	<tr><td>lint</td><td>Lints the server and site code</td></tr>
	<tr><td>lint-site</td><td>Lints only the side code</td></tr>
	<tr><td>lint-server</td><td>Lints only the server code</td></tr>
	<tr><td>lint-internal</td><td>Lints the Non-site/Non-Server code (like gulp and webpack configurator, etc)</td></tr>
</table>

### Gulp

Gulp is the task manager for building and joining many things for the project.

Note that while we do use Webpack, it is used mostly for a build / compilation system - as the task / build process can leave quite a bit to be desired.

Using the dynamic abilities of gulp to dynamicall guide / configure webpack (such as whether or not to include commands in the build / whether compile vs watch / and so on - provides the best of both worlds.

#### Rejection of global packages

Note that global packages are not used nor required throughout the project, meaning that we can always be sure that all team members builds will be consistent and identical.

#### Executing gulp

To run gulp, simply run a command like the following:
`npm run gulp -- [[gulp arguments]]`

For example, to call the normal `gulp --tasks` command, simply run:
`npm run gulp -- --tasks`

#### Enhanced tasks

Some tasks have been enhanced to use additional command line arguments,
such as the build task to create a new page:

`npm run gulp -- create-page --pageName=SomeNewPage`

this will create new /src/serverSrc/pages/SomeNewPage.ejs and /src/siteSrc/script/app/SomeNewPage.js files - already configured for webpack.

Note that the `src/serverSrc/index.js` may still require a new route to be added...

----

## Running Locally

Typically, running the program locally would be done through a typical development command: `npm run watch`

This will start all necessary servers, including the livereload and file monitoring.

Note that the end of the command will notify you that all servers are loaded, and you can load the page at [https://localhost:5000/yourRoute](https://localhost:5000/yourRoute)

---

Once your site works as expected, you can then stop the server through a stop command (`ctrl-c`), and then running locally using heroku `npm run start` - this is the command that will be run by the live server - so it is important that you test it beforehand.

Your app should now be running on [localhost:5000](http://localhost:5000/).


Finally, we include the `npm run pre-deploy-check` to ensure that all lints and unit tests pass.  This ensures that the code deployed to production works as expected.


## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

# How was this done

## Gulp
Gulp is the build/task service that generates and manages files.

Note that while Webpack is also used, and it also does do some build/task management - it isn't the focus and does fall short to gulp in many cases.

So the decision was made to leverage gulp - as it prepares/configures Webpack - so we get the best of both worlds.  Webpack is leveraged for its strengths and made more dynamic through gulp.

## Webpack
Webpack is a building service that combines many files together.

This is not purely javascript, as it can also provide styles / images / etc - simply by importing them within the javascript file - and they will be available when that javascript file has finished compilation.

## eslint
Provides linting (or rule checking) of the files.

More on the rules used can be found here:
[https://eslint.org/docs/rules/your-rule-name](https://eslint.org/docs/rules/your-rule-name)

Often executed as the very first pre-compilation step.

Note that there is a production and a development version of the eslint rules.

They are automatically chosen based on NODE_ENV development or production.

	There was a consideration, because the rules for development and production
	should be similar in most cases.
	
	The decision was made to keep them 'whole' instead of 'extending'
	from one another just to make it clearer what those rules actually are.
	
## Babel
Provides transpilation from newer ES6 - etc formats into something that browsers understand better. (often as a pre-compilation step)

## Express
Express is the node web server that is used to serve files across the web (using Pages - ejs files - and partials)

As mentioned earlier, the traditional way of using react is to have a "dumb" html page and allowing a proxy to let react call express API messages and so on.

The approach taken here is to have webpack generate out the files within the express 'public' directory - while the server side / express side serves the results out.

## liveReload
(Competitor to browsersync - another option)
Provides a very simple socket server that browsers can listen to - to detect when they should refresh. (Used purely in watch situations)

## Nodemon
A server that runs node scripts, but can restart if those scripts change.

## Jest
A BDD unit testing framework (with many influences from Jasmine)
Providing code coverage among others.

# Node Package Review

## dependencies

These are libraries that are used in the running of the app (not in the preparation for it)

These should all be used in some form when the server should be running in production - things used to provide value.

<table>
	<tr>
		<th>package</th><th>Why is it needed</th>
	</tr>
	<tr>
		<td>body-parser</td><td>Allows for parsing the request body, commonly used for canvas apps and request mangling.</td>
	</tr>
	<tr>
		<td>request</td>
		<td>Simplified HTTP request client - used with body-parser, commonly used for canvas apps and request mangling.</td>
	</tr>
	<tr>
		<td>config</td><td>Provides configurations (literals) for your current Node_ENV environment.  The main place to store literals</td>
	</tr>
	<tr>
		<td>ejs</td><td>Embedded JavaScript Templates - used by express to provide simple page templates</td>
	</tr>
	<tr>
		<td>express</td><td>The express framework - used to serve web / api requests</td>
	</tr>
	<tr>
		<td>fancy-log</td><td>The gulp console.log equivalent that also includes time stamps and proper formatting</td>
	</tr>
	<tr>
		<td>fs-extra</td><td>A FileSystem (fs) extension that also provides promises</td>
	</tr>
	<tr>
		<td>immer</td><td>JavaScript immutability library - useful for managing state - like with react</td>
	</tr>
	<tr>
		<td>moment</td><td>JavaScript library for managing and validating dates / times</td>
	</tr>
	<tr>
		<td>path</td><td>A filesystem library that provides a safe way to reference other files in different operating systems.</td>
	</tr>
	<tr>
		<td>query-parse</td><td>A way to manage url GET parameters (between strings and objects)</td>
	</tr>
	<tr>
		<td>react</td><td>The react library</td>
	</tr>
	<tr>
		<td>react-dom</td><td>Library for interacting with DOM elements with react.</td>
	</tr>
</table>

## Dev Dependencies

<table>
	<tr>
		<th>group</th><th>package</th><th>Why is it needed</th>
	</tr>
	<tr>
		<td>Babel</td>
		<td>@babel/core</td>
		<td>Core module of babel</td>
	</tr>
	<tr>
		<td>Testing</td>
		<td>ajv</td>
		<td>A javascript object validator - very helpful for providing schemas for REST or other APIs - especially during testing.</td>
	</tr>
	<tr>
		<td>Babel</td>
		<td>babel-core</td>
		<td>Required by Jest (yes, in addition to @babel/core)</td>
	</tr>
	<tr>
		<td>Enzyme</td>
		<td>enzyme</td>
		<td>JSX / browser testing framework to allow for mounting and reviewing the compiled components.</td>
	</tr>
	<tr>
		<td>ESLint</td>
		<td>eslint</td>
		<td>Linter</td>
	</tr>
	<tr>
		<td>Gulp</td>
		<td>gulp</td>
		<td>Main task / build system</td>
	</tr>
	<tr>
		<td>Jest</td>
		<td>jest</td>
		<td>JavaScript BDD Testing framework</td>
	</tr>
	<tr>
		<td>Jest</td>
		<td>jest-cli</td>
		<td>Module for calling Jest (either cli or through modules)</td>
	</tr>
	<tr>
		<td>LiveReload</td>
		<td>livereload</td>
		<td>Socket server that tells the browser when to refresh. Used only for development.</td>
	</tr>
	<tr>
		<td>Nodemon</td>
		<td>nodemon</td>
		<td>Executes node scripts (like the express server) and restarts once the scripts change. Used only for development</td>
	</tr>
	<tr>
		<td>Styleguidist</td>
		<td>react-styleguidist</td>
		<td>Documentation tool for react</td>
	</tr>
	<tr>
		<td>Underscore</td>
		<td>underscore</td>
		<td>(Competitor with lodash) Swiss army knife for common javascript functionality.</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>webpack</td>
		<td>JavaScript builder that supports require / imports along with css / scss to a single js file.</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>webpack-cli</td>
		<td>CLI for webpack - also provides the way to load webpack from node modules</td>
	</tr>
	<tr>
		<td>Yargs</td>
		<td>yargs</td>
		<td>Utility to allow command line arguments to be processed (like gulp doTask --someArgument=2)</td>
	</tr>
</table>

## Dev Dependency plugins

Because there are quite a few plugins, they were separated here to keep the list more manageable

<table>
	<tr>
		<th>Plugin for</th><th>package</th><th>Why is it needed</th>
	</tr>
	<tr>
		<td>Babel</td>
		<td>@babel/plugin-proposal-class-properties</td>
		<td>Module that allows es6 classes to define properties. This is especially helpful for many react scripts, like those that use arrow functions when defining methods.</td>
	</tr>
	<tr>
		<td>Babel</td>
		<td>@babel/preset-env</td>
		<td>The standard environment babel preset</td>
	</tr>
	<tr>
		<td>Babel</td>
		<td>@babel/preset-react</td>
		<td>The standard react babel preset</td>
	</tr>
	<tr>
		<td>Babel</td>
		<td>babel-jest</td>
		<td>Babel plugin to support jest</td>
	</tr>
	<tr>
		<td>Babel</td>
		<td>babel-preset-stage-2</td>
		<td>Babel preset for stage 2 plugins</td>
	</tr>
	<tr>
		<td>Enzyme</td>
		<td>enzyme-adapter-react-16</td>
		<td>Enzyme plugin to support react components</td>
	</tr>
	<tr>
		<td>ESLint</td>
		<td>babel-eslint</td>
		<td>Babel plugin to support eslint requests</td>
	</tr>
	<tr>
		<td>ESLint</td>
		<td>eslint-config-airbnb-base</td>
		<td>Eslint plugin to support airbnb styles / rules</td>
	</tr>
	<tr>
		<td>ESLint</td>
		<td>eslint-config-standard-react</td>
		<td>ESLint plugin to support react styles / rules</td>
	</tr>
	<tr>
		<td>ESLint</td>
		<td>eslint-friendly-formatter</td>
		<td>ESLint plugin to provide results in a way easier to read</td>
	</tr>
	<tr>
		<td>ESLint</td>
		<td>eslint-plugin-import</td>
		<td>ESLint plugin for supporting amd modules / imports</td>
	</tr>
	<tr>
		<td>ESLint</td>
		<td>eslint-plugin-react</td>
		<td>ESLint plugin for supporting react</td>
	</tr>
	<tr>
		<td>ESLint</td>
		<td>eslint-plugin-require-jsdoc</td>
		<td>ESLint plugin for requiring javascript docs (jsdocs)</td>
	</tr>
	<tr>
		<td>Gulp</td>
		<td>gulp-babel</td>
		<td>Gulp plugin for supporting babel</td>
	</tr>
	<tr>
		<td>Gulp</td>
		<td>gulp-clean-css</td>
		<td>Gulp plugin for mangling css - currently not used - as webpack handles this</td>
	</tr>
	<tr>
		<td>Gulp</td>
		<td>gulp-eslint</td>
		<td>Gulp plugin for using eslint</td>
	</tr>
	<tr>
		<td>Gulp</td>
		<td>gulp-plumber</td>
		<td>Gulp plugin to better handle script errors / SIGINTs</td>
	</tr>
	<tr>
		<td>Gulp</td>
		<td>gulp-sass</td>
		<td>Gulp plugin to handle SCSS / SASS files - currently not used - as webpack handles this</td>
	</tr>
	<tr>
		<td>Gulp</td>
		<td>gulp-uglify</td>
		<td>Gulp plugin for minifying css / javascript - currently not used - as webpack handles this</td>
	</tr>
	<tr>
		<td>Jest</td>
		<td>jest-expect-message</td>
		<td>Jest plugin to allow expect to handle reasons why it is expected. For example: expect(2+2,'it is not 1984').not.toBe('love');</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>babel-loader</td>
		<td>Webpack plugin to support babel</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>copy-webpack-plugin</td>
		<td>Webpack plugin to support copying files literally, even if not directly referenced from any javascript files</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>css-loader</td>
		<td>Webpack plugin for supporting css</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>file-loader</td>
		<td>Webpack plugin for referencing external files</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>imagemin</td>
		<td>Webpack plugin for image compression</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>img-loader</td>
		<td>Webpack plugin for loading images into the compiled results</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>eslint-loader</td>
		<td>Webpack plugin for loading in ESLint</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>sass-loader</td>
		<td>Webpack plugin for loading scss/sass files.</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>style-loader</td>
		<td>Webpack plugin for loading css styles</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>url-loader</td>
		<td>Webpack plugin for specifying urls</td>
	</tr>
	<tr>
		<td>Webpack</td>
		<td>webpack-stream</td>
		<td>Webpack plugin to provide Base64 streams</td>
	</tr>
</table>

# Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)

---

minimal react
https://www.robinwieruch.de/minimal-react-webpack-babel-setup/

storybook
https://medium.com/@mlthuret/building-a-react-components-living-documentation-using-react-storybook-5f11f0e7d23e
https://storybook.js.org/basics/guide-react/

styleguidist
https://react-styleguidist.js.org/

## TODO

use the config file to remove constants out of the scripts
support typescript
	(would prefer server too but needed for site)
	https://webpack.js.org/guides/typescript/
	http://www.typescriptlang.org/docs/handbook/react-&-webpack.html