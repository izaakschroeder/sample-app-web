
/**
 * This is the gulpfile. It is used by `gulp` to define a list of tasks to run
 * similar to Ruby's `rake`. To see all available tasks simply type `gulp -T`
 * at the command prompt. Tasks for this project are stored in `./tasks`.
 *
 * See:
 * - https://github.com/gulpjs/gulp
 * - https://github.com/frankwallis/gulp-hub
 */

// Load modules.
var gulp = require('gulp'),
	HubRegistry = require('gulp-hub'),
	dotenv = require('dotenv');

// Load configuration values from `.env` files; don't complain if we can't.
dotenv.load({ silent: true });

// Allow for ES6 in task files.
require("babel/register");

// Load all tasks into the registry.
var hub = new HubRegistry(['./tasks/*.task.js']);

// Tell gulp to use the tasks just loaded.
gulp.registry(hub);
