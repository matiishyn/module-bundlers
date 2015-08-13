https://www.youtube.com/watch?v=CTAa8IcQh1U

## 1. Getting started with Browserify
Browserify lets you require('modules') in the browser by bundling up all of your dependencies.

- Install Browserify useing npm
```
npm install browserify --save-dev -g
```
- Build app.js and its all dependencies to bundle.js
```
browserify app.js -o bundle.js
```
- Write code in app.js but include bundle.js to your html

### Let's add jQuery
Browserify works great with `npm`

- Install jQuery via npm
```
npm install jquery --save
```
- Require jQuery module from your app.js
```javascript
var $ = require('jquery');
// now you may use $ as jQuery
```

### `watchify` - build after every change
Install `watchify` and it will build `browserify` after every change
- install
```
npm install watchify --save-dev -g
```
- watch
```
watchify app.js -o bundle.js
```

## 2. Better structure
- structure your code moving to appropriate folders and export results from every file
```javascript
// file buttons/button.js
var $ = require('jquery'); // require dependencied

var button = ...;

module.exports = button; // export data
```

```javascript
// file app.js
var $ = require('jquery'), // require dependencied
	button = require('./buttons/button.js'); // import local file

// use button as a variable here
```

## 3. Transform Your Bundles With Browserify
(https://youtu.be/Uk2bgp8OLT8)
this is how you can transform your bundles

## 4. AngularJS with Gulp and Browserify
Resources:
http://omarfouad.com/blog/2015/03/21/advanced-angularjs-structure-with-gulp-node-and-browserify/

- **Install some dependencies**
```
npm i gulp gulp-connect gulp-ruby-sass --save-dev
```
- **Let's configure a very simple connect to serve our application**

`gulpfile.js`
```javascript
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		root: 'public',
		port: 4000
	});
});
```

- **Now let's install some additional dependencies**
```
npm install --save-dev browserify vinyl-source-stream
```

*`vinyl-source-stream` is a package that converts a Browserify stream into a stream that Gulp actually understands.*
