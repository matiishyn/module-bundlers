Resources:
- http://blog.thoughtram.io/angularjs/es6/2015/01/23/exploring-angular-1.3-using-es6.html
- http://www.michaelbromley.co.uk/blog/350/exploring-es6-classes-in-angularjs-1-x
- http://cameronjroe.com/writing/code/angular-movie-search/
- http://martinmicunda.com/2015/02/09/how-to-start-writing-apps-with-es6-angular-1x-and-jspm/

## Angular and ES6 modules

```js
class MainController {

    constructor(searchService) {
    	// DI goes here
        this.searchService = searchService;
    }

    search () {
        this.searchService
            .fetch(this.searchTerm)
            .then(response => {
                this.items = response.data.items;
            });
    }
}
export { MainController }
```

```js
import { MainController } from './path/to/MainController';
```

## Angular and ES6 inheritance

```js
class PageController {

    constructor(title) {
        this._title = title;
    }

    title () {
        return 'Title: ' + this._title;
    }
}
export { PageController }
```

```js
import { PageController } from './PageController';

class ProductPageController extends PageController {

    constructor() {
        super('ES6 inheritance with Angular');
    }
}

export { ProductPageController }
```

## dependency annotations
### `$inject`
In order to preserve dependency annotations for minification, we need to use the $inject property notation now:

```js
class ThingFactory {
    constructor($timeout) {
        // ...
    }
}
ThingFactory.$inject = ['$timeout'];
```

### `ng-annotate`
```js
class MyAngularComponent {
    /*@ngInject*/
    constructor(dependency1, dependency2) {
        this.dependency1 = dependency1;
        // stuff happens here
    }
    someMethods() {
        this.dependency1.doThatThing();
        // more stuff here
    }
}
```

## Services & Controllers

```js
class UserService {
    constructor($http) {
        this.$http = $http;
    }
    getFullName() {
        return this.$http.get('api/user/details');
    }
}

class MyController {
    constructor(userService) {
        userService.getFullName()
            .then(result => this.userName = result.fullName);
    }
}

angular.module('app')
    .service('userService', UserService)
    .controller('MyController', MyController);
```
## Providers
The provider expects a constructor function which must contain a property named $get, which should be a factory function.
```js
class ThingServiceProvider {
    constructor() {
        this.apiPath = 'default/api';
    }
    setApiPath(value) {
        this.apiPath = value;
    }
    $get($http) {
        return {
            getThings: () => $http.get(this.apiPath)
        };
    }
}

angular.module('app')
    .provider('thingService', ThingServiceProvider);
```

## [Factories](http://www.michaelbromley.co.uk/blog/350/exploring-es6-classes-in-angularjs-1-x#_section-factories)


## Directives
```js
class MyDirective {
    constructor($interval) {
        this.template = '<div>I\'m a directive!</div>'; 
        this.restrict = 'E'; 
        this.scope = {} 
        // etc. for the usual config options 

        // allows us to use the injected dependencies 
        // elsewhere in the directive (e.g. compile or link function) 
        this.$interval = $interval; 
    } 

    // optional link function 
    link(scope, element) { 
        this.$interval(() => this.move(element), 1000); 
    } 

    move(element) {
        element.css('left', (Math.random() * 500) + 'px'); 
        element.css('top', (Math.random() * 500) + 'px'); 
    } 
}
```
