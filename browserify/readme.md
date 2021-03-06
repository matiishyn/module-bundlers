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

- **and create `browserify` task in `gulp`**

*Now let's write a task that takes your `app/app.js` file, browserifies it and saves it to `public/js/main.js` to be then included in your HTML file.*

`gulpfile.js`
```javascript
...
var browserify = require('browserify'),
	source = require('vinyl-source-stream');
...
gulp.task('browserify', function() {
	// get app.js
	return browserify('./app/app.js')
		// bundle it and create main.js
		.bundle()
		.pipe(source('main.js'))
		// save to public/js/ directory
		.pipe(gulp.dest('./public/js/'))
});
```

- **download `AngularJS`, create simple application**

```
npm install --save angular
```

`app/app.js`
```javascript
require('angular'); // require and make 'angular' global

angular.module('app', []).controller('MainCtrl', function($scope) {
	$scope.msg = 'Hello from Angular';
});
```

`public/index.html`
```html
<html ng-app="app" lang="en">
<head>
	<script src="/js/main.js"></script>
</head>
<body ng-controller="MainCtrl">
	<h1>{{msg}}</h1>
</body>
</html>
```

- **`browserify` code and run application**

```
gulp browserify
gulp connect
```

- **Modular Angular**

`app/controllers/MainCtrl.js`
```javascript
module.exports = function($scope) {
	$scope.msg = 'MainCtrl is separated';
}
```

`app/app.js`
```javascript
require('angular'); // require and make 'angular' global

var MainCtrl = require('./controllers/MainCtrl')

angular.module('app', []).controller('MainCtrl', MainCtrl);
```

## 5. More modular Angular

`app.js`
```js
'use strict';

var angular = require('angular');

angular.module('app', [
      require('./modules/login').name,
      require('./modules/charts').name,
      ...
    ])
    .config(require('./common/routes'))
    .constant('version', require('../package.json').version);
```

`modules/charts/index.js`
```js
'use strict';

module.exports = angular.module('app.charts', [
		require('./pie').name,
		require('./timeline').name,
		require('./treemap').name,
		require('./scatterplot').name
	])
	.controller('ChartMgrCtrl', require('./ChartMgrCtrl'));
```

`modules/charts/pie/index.js`
```js
'use strict';

var pieChartDirective = require('./PieChartDirective'),
    pieChartController = require('./PieChartController');

module.exports = angular.module('app.charts.pieChart', [])
    .directive('pieChart', pieChartDirective)
    .controller('PieChartCtrl', pieChartController);
```

`PieChartDirective.js`
```js
'use strict';

module.exports = function () {
    return {
        scope: {
            chartData: '=',
            isMaximized: '='
        },
        restrict: 'A',
        controller: 'PieChartController',
        link: function (scope, element, attrs) {
            scope.el = element[0];
        }
    };
};
```

## 6. Angular, ES6, Browserify

resource: https://www.timroes.de/2015/07/29/using-ecmascript-6-es6-with-angularjs-1-x/

When you want to use ES6 modules (export) and import them in another class the compiler has to do something to these modules, when they are compiled to ES5. Babel can convert ES6 modules to CommonJS, AMD, UMD or System modules. The problem is, how are these loaded in the browser. You could compile to AMD and use a library like RequireJS to load these modules in the browser.

#### Dependencies
```
npm i gulp browserify babelify vinyl-source-stream vinyl-buffer angular --save-dev
```

- `vinyl-buffer` - Convert streaming vinyl files to use buffers
- `vinyl-source-stream` - Use conventional text streams at the start of your gulp or vinyl pipelines

#### Gulp - 'script' task

```javascript
var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

gulp.task('script', function() {
	var sources = browserify({
		entries: 'src/scripts/app.js',
		debug: true
	})
	.transform(babelify.configure());

	return sources.bundle()
		.pipe(vinylSourceStream('app.min.js'))
		.pipe(vinylBuffer())
		.pipe(gulp.dest('src/scripts/'));
});
```

#### ES6 Angular 1.x Application

`app.js`
```javascript
import angular from 'angular';
import HomeController from './controllers/HomeCtrl';
import NameService from './services/PersonService';
import {UpperFilter, LowerFilter} from './filters/textFilters';

angular.module('myApp', [])
	.controller('HomeController', HomeController)
	.filter('upper', UpperFilter)
	.filter('lower', LowerFilter)
	.service('PersonService', NameService);
```

`HomeCtrl.js`
```js
export default function($scope, PersonService) {
	PersonService.getPerson().promise.then(function(person) {
		debugger;
		$scope.person = person;
	});
}
```

`filters`
```js
export function UpperFilter() {
	return function(input) {
		return input.toUpperCase();
	};
}

export function LowerFilter() {
	return function(input) {
		return input.toLowerCase();
	};
}
```

`PersonService.js`
```js
import Person from '../model/Person';

export default class PersonService {
	constructor($q) {
		// Angular's DI here
		this._$q = $q.defer();
	}

	getPerson() {
		this._$q.resolve(new Person().name);
		return this._$q;
	}
}
```

get the whole example here: https://github.com/timroes/angular-es6-sample