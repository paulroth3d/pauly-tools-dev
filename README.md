# node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

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
	<tr><td>test-watch</td><td>Watch server and site code for linting / running tests</td></tr>
	<tr><td>test-debug</td><td>Runs the test scripts with inspect-brk <br />(note that breakpoints won't work in jest prior to Node 8+</td></tr>
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

## Documentation

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